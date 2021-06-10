import * as cdk from '@aws-cdk/core';
import * as ec2 from '@aws-cdk/aws-ec2';
import { IVpcProps } from '../interfaces';

export class VpcCreate {
    private vpc: any;

    constructor(scope: cdk.Construct, VpcName: string, props: IVpcProps = {}) {
        const {isAVpcExisting = false, vpcId = ''} = props;
        if(isAVpcExisting) {
            this.vpc = ec2.Vpc.fromLookup(scope, VpcName,{vpcId: vpcId });
        } else {
            this.vpc = new ec2.Vpc(scope, VpcName);
        }
    }

    getVpc(): any {
        return this.vpc
    }
}