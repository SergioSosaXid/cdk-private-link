import * as cdk from '@aws-cdk/core';
import {VpcLink} from '@aws-cdk/aws-apigatewayv2';

export class VpcLinkHelper {
    private vpcLink: any;
    constructor(scope: cdk.Construct, name: string, props: any) {
        const {isVpcLinkExists = false, vpcLinkId = '', vpc} = props;
        if(isVpcLinkExists) {
            this.vpcLink =  VpcLink.fromVpcLinkAttributes(scope, 'VpcLinkStatus', {
                vpcLinkId,
                vpc
            });
            console.log("hola")
        }else {
            console.log("mundo")
            this.vpcLink = new VpcLink(scope,'VpcLinkStatus', {
                vpc
            })
        }
    }

    getVpcLink (): any {
        return this.vpcLink;
    }
}