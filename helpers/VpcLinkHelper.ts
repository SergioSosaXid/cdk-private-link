import * as cdk from '@aws-cdk/core';
import {VpcLink} from '@aws-cdk/aws-apigateway';

export class VpcLinkHelper {
    private vpcLink: any;
    constructor(scope: cdk.Construct, name: string, props: any) {
        const {isVpcLinkExists = false, vpcLinkId = ''} = props;
        if(isVpcLinkExists) {
            this.vpcLink =  VpcLink.fromVpcLinkId(scope, 'VpcLinkStatus', vpcLinkId);
        }else {
            this.vpcLink = new VpcLink(scope,'VpcLinkStatus', {
                vpcLinkName: 'Private VpcLink',
                description: 'Esto es una prueba de concepto'
            })
        }
    }

    getVpcLink (): any {
        return this.vpcLink;
    }
}