import * as cdk from '@aws-cdk/core';
import * as elbv2 from '@aws-cdk/aws-elasticloadbalancingv2';
import { IElbProps } from '../interfaces';
import { IApplicationListener } from '@aws-cdk/aws-elasticloadbalancingv2';

export class ElbHelper {
    private elb: any;
    constructor(scope: cdk.Construct,name: string, props: any) {
        const { vpc,internetFacing = true, isElbExisting = false, arn = '' } = props;
        if(isElbExisting) {
            this.elb = elbv2.ApplicationLoadBalancer.fromLookup(scope,name,{
                loadBalancerArn: arn
            })
        }else {
            this.elb = new elbv2.ApplicationLoadBalancer(scope,name, {
                vpc,
                internetFacing,
            })
        }

    }

    getElb(): any {
        return this.elb;
    }
}