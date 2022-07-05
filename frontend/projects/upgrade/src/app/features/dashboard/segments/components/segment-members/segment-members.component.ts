import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter, ViewChild, ElementRef, OnChanges, SimpleChanges, OnInit } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators, FormArray } from '@angular/forms';
import { BehaviorSubject, Subscription } from 'rxjs';
import { NewSegmentDialogData, Segment, NewSegmentDialogEvents, NewSegmentPaths, MemberTypes  } from '../../../../../core/segments/store/segments.model';
import { ExperimentService } from '../../../../../core/experiments/experiments.service';
import { IContextMetaData } from '../../../../../core/experiments/store/experiments.model';
import { SEGMENT_TYPE, SEGMENT_STATUS } from 'upgrade_types';
import { SegmentsService } from '../../../../../core/segments/segments.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'segment-members',
  templateUrl: './segment-members.component.html',
  styleUrls: ['./segment-members.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SegmentMembersComponent implements OnInit, OnChanges {
  @Input() segmentInfo: Segment;
  @Input() currentContext: string;
  @Input() isContextChanged: boolean;
  @Output() emitSegmentDialogEvent = new EventEmitter<NewSegmentDialogData>();
  @ViewChild('membersTable', { static: false, read: ElementRef }) membersTable: ElementRef;

  segmentMembersForm: FormGroup;
  membersDataSource = new BehaviorSubject<AbstractControl[]>([]);
  contextMetaData: IContextMetaData | {} = {};
  contextMetaDataSub: Subscription;
  allSegments: Segment[];
  allSegmentsSub: Subscription;

  segmentMemberTypes : any[];
  subSegmentIds = [];
  userIdsToSend = [];
  groupsToSend = [];
  subSegmentIdsToSend = [];
  segmentNameId = new Map();
  membersCountError: string = null;

  membersDisplayedColumns = ['type', 'id', 'removeMember'];
  constructor(
    private _formBuilder: FormBuilder,
    private segmentsService: SegmentsService,
    private experimentService: ExperimentService,
    private translate: TranslateService
  ) {}

  ngOnChanges() {
    if (this.currentContext) {
      this.setMemberTypes();
    }

    if (this.isContextChanged) {
      this.isContextChanged = false;
      this.members.clear();
      this.membersDataSource.next(this.members.controls);
    }
  }

  ngOnInit() {
    this.contextMetaDataSub = this.experimentService.contextMetaData$.subscribe(contextMetaData => {
      this.contextMetaData = contextMetaData;
    });

    this.allSegmentsSub = this.segmentsService.allSegments$.subscribe(allSegments => {
      this.allSegments =  allSegments;
    });

    if (this.allSegments) {
      this.allSegments.forEach((segment) => {
        if (this.segmentInfo) {
          if (segment.type !== SEGMENT_TYPE.GLOBAL_EXCLUDE && segment.id !== this.segmentInfo.id) {
            this.subSegmentIds.push(segment.name);
            this.segmentNameId.set(segment.name, segment.id);
          }
        } else {
          if (segment.type !== SEGMENT_TYPE.GLOBAL_EXCLUDE) {
            this.subSegmentIds.push(segment.name);
            this.segmentNameId.set(segment.name, segment.id);
          }
        }  
      });
    }

    this.segmentMembersForm = this._formBuilder.group({
      members: this._formBuilder.array([this.addMembers()]),
    });

    if (this.segmentInfo) {
      this.members.removeAt(0);
      this.segmentInfo.individualForSegment.forEach((id) => {
        this.members.push(this.addMembers(MemberTypes.INDIVIDUAL, id.userId));
      });
      this.segmentInfo.groupForSegment.forEach((group) => {
        this.members.push(this.addMembers(group.type, group.groupId));
      });
      this.segmentInfo.subSegments.forEach((id) => {
        this.members.push(this.addMembers(MemberTypes.SEGMENT, id.name));
      });
    }
  
    this.updateView();
  }

  addMembers(type = null, id = null) {
    return this._formBuilder.group({
      type: [type , Validators.required],
      id: [id, Validators.required],
    });
  }

  addMember() {
    this.members.push(this.addMembers());
    this.updateView();
  }

  removeMember(groupIndex: number) {
    this.members.removeAt(groupIndex);
    this.updateView();
  }

  updateView() {
    this.membersDataSource.next(this.members.controls);
    if (this.membersTable) {
      this.membersTable.nativeElement.scroll({
        top: this.membersTable.nativeElement.scrollHeight,
        behavior: 'smooth'
      });
    }
  }

  validateMembersCount(members: any) {
    const membersCountErrorMsg = this.translate.instant("segments.global-members.segments-count-members-error.text");
    this.membersCountError = null;
    if (members.length === 0) {
      this.membersCountError = membersCountErrorMsg;
    }
  }

  setMemberTypes() {
    this.segmentMemberTypes = [];
    this.segmentMemberTypes.push({ heading: '', value: [MemberTypes.INDIVIDUAL] });
    this.segmentMemberTypes.push({ heading: '', value: [MemberTypes.SEGMENT] });
    const groups = [];
    if (this.currentContext === 'ALL') {
      const contexts = Object.keys(this.contextMetaData['contextMetadata']) || [];
      contexts.forEach(context => {
        this.contextMetaData['contextMetadata'][context].GROUP_TYPES.forEach(group => {
          groups.push(group);
        });
      });
    }
    else if (this.contextMetaData['contextMetadata'] && this.contextMetaData['contextMetadata'][this.currentContext]) {
      this.contextMetaData['contextMetadata'][this.currentContext].GROUP_TYPES.forEach(type => {
        groups.push(type);
      });
    }
    this.segmentMemberTypes.push({ heading: 'group', value: groups });
  }

  gettingMembersValueToSend(members: any) {
    members.forEach(member => {
      if (member.type === MemberTypes.INDIVIDUAL) {
        this.userIdsToSend.push(member.id);
      } else if(member.type === MemberTypes.SEGMENT) {
        this.subSegmentIdsToSend.push(this.segmentNameId.get(member.id));
      } else {
        this.groupsToSend.push({ type: member.type, groupId: member.id });
      }
    });
  }

  emitEvent(eventType: NewSegmentDialogEvents) {
    switch (eventType) {
      case NewSegmentDialogEvents.CLOSE_DIALOG:
        this.emitSegmentDialogEvent.emit({ type: eventType });
        break;
      case NewSegmentDialogEvents.SEND_FORM_DATA:
        const { members } = this.segmentMembersForm.value;
        this.validateMembersCount(members);
        if (this.segmentMembersForm.valid && !this.membersCountError) {
          this.gettingMembersValueToSend(members);
          const segmentMembersFormData = {
            userIds: this.userIdsToSend,
            groups: this.groupsToSend,
            subSegmentIds: this.subSegmentIdsToSend,
            type: this.segmentInfo ? this.segmentInfo.type : SEGMENT_TYPE.PUBLIC,
            status: SEGMENT_STATUS.UNUSED
          }
          this.emitSegmentDialogEvent.emit({
            type: this.segmentInfo ? NewSegmentDialogEvents.UPDATE_SEGMENT : eventType,
            formData: segmentMembersFormData,
            path: NewSegmentPaths.SEGMENT_MEMBERS
          });
        }
      break;
    }
  }

  get members(): FormArray {
    return this.segmentMembersForm.get('members') as FormArray;
  }

  get NewSegmentDialogEvents() {
    return NewSegmentDialogEvents;
  }

  get getMemberTypes() {
    return this.segmentMemberTypes;
  }

  ngOnDestroy() {
    this.contextMetaDataSub.unsubscribe();
    this.allSegmentsSub.unsubscribe();
  }
}