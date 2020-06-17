import { Component, OnInit, ViewChild, ElementRef, OnDestroy, Input } from '@angular/core';
import { Subscription, BehaviorSubject, of } from 'rxjs';
import { MetricUnit, OPERATION_TYPES, METRICS_JOIN_TEXT, Query } from '../../../../../core/analysis/store/analysis.models';
import { NestedTreeControl } from '@angular/cdk/tree';
import { MatTreeNestedDataSource, MatTableDataSource } from '@angular/material';
import { AnalysisService } from '../../../../../core/analysis/analysis.service';
import { ExperimentVM } from '../../../../../core/experiments/store/experiments.model';
import { ExperimentService } from '../../../../../core/experiments/experiments.service';

@Component({
  selector: 'app-create-query',
  templateUrl: './create-query.component.html',
  styleUrls: ['./create-query.component.scss'],
})
export class CreateQueryComponent implements OnInit, OnDestroy {
  @Input() experimentInfo: ExperimentVM;
  displayedColumns = ['id', 'metric'];

  // Used for displaying metrics
  allMetrics: any;
  allMetricsSub: Subscription;
  isAnalysisMetricsLoading$ = this.analysisService.isMetricsLoading$;

  // For tree structure
  _dataChange = new BehaviorSubject<MetricUnit[]>([]);
  nestedTreeControl: NestedTreeControl<MetricUnit>;
  nestedDataSource: MatTreeNestedDataSource<MetricUnit>;
  insertNodeIndex = 0;

  selectedMetricIndex = null;
  selectedKey: string;
  // TODO: Update type
  selectedKeyMeta: any;
  selectedOperation: string;
  queryName: string;

  queryOperations = [];

  // Where clause
  comparisonFns = [
    { value: '=', viewValue: 'equal' },
    { value: '<>', viewValue: 'not equal' }
  ];
  compareFn: string;
  compareValue: string;

  @ViewChild('metricsTable', { static: false }) metricsTable: ElementRef;

  constructor(
    private analysisService: AnalysisService,
    private experimentService: ExperimentService
  ) { }

  ngOnInit() {
    this.allMetricsSub = this.analysisService.allMetrics$.subscribe(metrics => {
      this.selectedMetricIndex = null;
      this.allMetrics = new MatTableDataSource();
      this.allMetrics.data = metrics;
    });

    this.nestedTreeControl = new NestedTreeControl<MetricUnit>(this._getChildren);
    this.nestedDataSource = new MatTreeNestedDataSource();

    this._dataChange.subscribe(
      data => (this.nestedDataSource.data = data)
    );
  }

  private _getChildren = (node: MetricUnit) => of(node.children);
  hasNestedChild = (_: number, nodeData: MetricUnit) => nodeData.children.length > 0;

  createTree(metrics: MetricUnit[]): void {
    const tree = metrics.map(metric => this.insertNode(metric));
    this._dataChange.next(tree);
  }

  insertNode(metrics: any): MetricUnit {
    if (!metrics.children.length) {
      const data = { id: this.insertNodeIndex, ...metrics };
      this.insertNodeIndex += 1;
      return data;
    }
    metrics = {
      id: this.insertNodeIndex, ...metrics, children: metrics.children.map(data => {
        this.insertNodeIndex += 1;
        data = this.insertNode(data);
        return data;
      })
    };
    return metrics;
  }

  selectKey(node) {
    if (!node.children.length) {
      this.selectedKey = node.key;
      this.selectedKeyMeta = node;
      if (node.metadata && node.metadata.type === 'continuous') {
        this.queryOperations = [
          { value: OPERATION_TYPES.SUM, viewValue: 'Sum' },
          { value: OPERATION_TYPES.MIN, viewValue: 'Min' },
          { value: OPERATION_TYPES.MAX, viewValue: 'Max' },
          { value: OPERATION_TYPES.COUNT, viewValue: 'Count' },
          { value: OPERATION_TYPES.AVERAGE, viewValue: 'Average' },
          { value: OPERATION_TYPES.MODE, viewValue: 'Mode' },
          { value: OPERATION_TYPES.MEDIAN, viewValue: 'Median' },
          { value: OPERATION_TYPES.STDEV, viewValue: 'Standard Deviation' }
        ];
      } else if (node.metadata && node.metadata.type === 'categorical') {
        this.queryOperations = [
          { value: OPERATION_TYPES.COUNT, viewValue: 'Count' },
          { value: 'percent', viewValue: 'Percent' }
        ];
      }
    } else {
      this.selectedKey = null;
      this.selectedKeyMeta = null;
    }
  }

  setTreeForMetric(index: number) {
    this.selectedMetricIndex = index;
    this.resetVariables();
    this.insertNodeIndex = 0;
    this.createTree([this.allMetrics.data[index]]);
  }

  // TODO: Make common
  findParents(node, searchForKey) {

    // If current node name matches the search name, return
    // empty array which is the beginning of our parent result
    if (node.key === searchForKey) {
      return [];
    }

    // Otherwise, if this node has a tree field/value, recursively
    // process the nodes in this tree array
    if (Array.isArray(node.children)) {

      for (const treeNode of node.children) {

        // Recursively process treeNode. If an array result is
        // returned, then add the treeNode.key to that result
        // and return recursively
        const childResult = this.findParents(treeNode, searchForKey)

        if (Array.isArray(childResult)) {
          return [ treeNode.key ].concat( childResult );
        }
      }
    }
  }

  saveQuery() {
    const data = {
      children: this.nestedDataSource.data
    };
    const key = this.findParents(data, this.selectedKey);
    let queryObj: Query = {
      name: this.queryName,
      query: {
        operationType: this.selectedOperation
      },
      metric: {
        key: key.join(METRICS_JOIN_TEXT)
      },
    };
    if (this.compareFn) {
      queryObj = {
        ...queryObj,
        query: {
          ...queryObj.query,
          compareFn: this.compareFn,
          compareValue: this.compareValue
        }
      }
    }
    this.experimentInfo.queries = [ ...this.experimentInfo.queries, queryObj];
    this.experimentService.updateExperiment(this.experimentInfo);
    this.selectedMetricIndex = null;
    this.resetVariables();
  }

  resetVariables() {
    this.selectedKey = null;
    this.selectedOperation = null;
    this.queryName = null;
    this.compareFn = null;
    this.compareValue = null;
    this.selectedKeyMeta = null;
  }

  ngOnDestroy() {
    this.allMetricsSub.unsubscribe();
  }
}
