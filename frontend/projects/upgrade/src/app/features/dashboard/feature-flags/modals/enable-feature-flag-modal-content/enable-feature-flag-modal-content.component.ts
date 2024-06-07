import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { CommonModalComponent } from '../../../../../shared-standalone-component-lib/components';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CommonModalConfig } from '../../../../../shared-standalone-component-lib/components/common-modal/common-modal-config';
import { AddFeatureFlagModalComponent } from '../add-feature-flag-modal/add-feature-flag-modal.component';
import { TranslateModule } from '@ngx-translate/core';
import { FeatureFlagsService } from '../../../../../core/feature-flags/feature-flags.service';
import { UpdateFeatureFlagStatusRequest } from '../../../../../core/feature-flags/store/feature-flags.model';
import { FEATURE_FLAG_STATUS } from '../../../../../../../../../../types/src';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-enable-feature-flag-modal-content',
  standalone: true,
  imports: [CommonModalComponent, TranslateModule],
  templateUrl: './enable-feature-flag-modal-content.component.html',
  styleUrl: './enable-feature-flag-modal-content.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EnableFeatureFlagModalContentComponent {
  isLoadingUpdateFeatureFlagStatus$ = this.featureFlagService.isLoadingUpdateFeatureFlagStatus$;
  isUpdateFeatureFlagStatusSuccess$ = this.featureFlagService.selectIsUpdateFeatureFlagStatusComplete$;
  subscriptions = new Subscription();

  featureFlagName: string;
  featureFlagId: string;

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public config: CommonModalConfig,
    public featureFlagService: FeatureFlagsService,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<AddFeatureFlagModalComponent>
  ) {
    this.featureFlagName = this.config.payload.flagName as string;
    this.featureFlagId = this.config.payload.flagId as string;
  }

  listenForFeatureFlagStatusChanges(): void {
    this.subscriptions = this.isLoadingUpdateFeatureFlagStatus$.subscribe(() => this.closeModal());
  }

  onPrimaryActionBtnClicked() {
    const updateFeatureFlagStatusRequest: UpdateFeatureFlagStatusRequest = {
      flagId: this.featureFlagId,
      status: FEATURE_FLAG_STATUS.ENABLED,
    };
    this.featureFlagService.enableFeatureFlag(updateFeatureFlagStatusRequest);
  }

  closeModal() {
    this.dialogRef.close();
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
