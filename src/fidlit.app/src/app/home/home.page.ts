import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { FlatTreeControl } from '@angular/cdk/tree';

import {
  MatTreeFlatDataSource,
  MatTreeFlattener,
} from '@angular/material/tree';

/**
 * Food data with nested structure.
 * Each node has a name and an optional list of children.
 */
interface CapabilityNode {
  name: string;
  children?: CapabilityNode[];
}

/** Flat node with expandable and level information */
interface ExampleFlatNode {
  expandable: boolean;
  name: string;
  level: number;
}

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  private _transformer = (node: CapabilityNode, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      level: level,
    };
  };

  treeControl = new FlatTreeControl<ExampleFlatNode>(
    (node) => node.level,
    (node) => node.expandable
  );

  treeFlattener = new MatTreeFlattener(
    this._transformer,
    (node) => node.level,
    (node) => node.expandable,
    (node) => node.children
  );

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  constructor(private http: HttpClient) {
    http
      .get('api/examples/industries/airlines/capabilities.json')
      .subscribe((response: any) => {
        // console.log('capabilities response', response);
        const rawCapabilities = response.capabilities;

        const allCapabilities: any[] = [];
        const capabilities: any[] = [];

        rawCapabilities.forEach((rawCapability: any) => {
          const code = rawCapability.code.replace('.0', '');

          const capability = {
            code,
            name: `${rawCapability.code} ${rawCapability.name}`,
            children: [],
          };

          console.log('capability', capability);

          allCapabilities.push(capability);

          const parentCode = code.substring(0, code.lastIndexOf('.'));

          if (code.indexOf('.') > 0) {
            const parentCapability = allCapabilities.find(
              (cap) => cap.code == parentCode
            );

            if (!parentCapability) {
              console.log('all', allCapabilities);
              throw new Error(
                `Unexpected error missing parent capability "${parentCode}" for "${rawCapability.code}".`
              );
            }

            parentCapability.children.push(capability);
          } else {
            capabilities.push(capability);
          }
        });

        this.dataSource.data = capabilities;
      });

    this.dataSource.data = [];
  }

  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;
}
