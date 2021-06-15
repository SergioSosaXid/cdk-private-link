import * as cdk from '@aws-cdk/core';
import * as elbv2 from '@aws-cdk/aws-elasticloadbalancingv2';

export class ElbHelper {
    private elb: any;
    private elbListener: any; 
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

    getEventListener(scope: cdk.Construct, name: string, arn: string ): any {
        if (arn.length === 0) {
            const listener = this.elb.addListener('listener', { port: 80 });
                listener.addTargets('target', {
                port: 80,
            })
        }else {
            this.elbListener = elbv2.ApplicationListener.fromLookup(scope, name, {
                listenerArn: arn,
                
            })
        }
        return this.elbListener;
    }
}