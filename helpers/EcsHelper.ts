import * as cdk from '@aws-cdk/core';
import * as ecs from '@aws-cdk/aws-ecs';
import {SecurityGroup} from '@aws-cdk/aws-ec2';

export class EcsHelper {
    private ecs: any;
    constructor(scope: cdk.Construct, props: any) {
        const {vpc, securityGroupId } = props;
        // this.ecs = 
        const securityGroup: any = SecurityGroup.fromLookup(scope, 'SecurityId', securityGroupId);
        this.ecs = ecs.Cluster.fromClusterAttributes(scope,'MyCluster',{
            clusterName: 'TestClousterUpdate',
            vpc,
            securityGroups: [securityGroup],
            clusterArn: 'arn:aws:ecs:us-east-1:642537107330:cluster/TestClouster'
        })
    }

    getEcs(): any {
        return this.ecs;
    }

    
}