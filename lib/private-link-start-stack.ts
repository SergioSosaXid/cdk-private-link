import * as cdk from '@aws-cdk/core';
import { VpcCreate } from '../helpers/VpcCreate';
import { HttpAlbIntegration } from '@aws-cdk/aws-apigatewayv2-integrations';
import { HttpApi, HttpMethod } from '@aws-cdk/aws-apigatewayv2';
import { ElbHelper } from '../helpers/ElbHelper';
import { VpcLinkHelper } from '../helpers/VpcLinkHelper';



export class PrivateLinkStartStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);
    const vpcClass: any = new VpcCreate(this,'MyNewVpc', {
      isAVpcExisting: process.env.VPC_ID ? true : false,
      vpcId: process.env.VPC_ID ? process.env.VPC_ID:''
    });
    
    const elb = new ElbHelper(this, 'EC2Name',{
      isElbExisting: process.env.ALB_ARN ? true:false,
      arn: process.env.ALB_ARN ? process.env.ALB_ARN : 'arn:aws:elasticloadbalancing:us-east-1:642537107330:loadbalancer/app/test-balancer/e1e8539535642d5a'
    });
    
    /* const ecs = new EcsHelper(this, {
      vpc: vpcClass.getVpc(),
      securityGroupId: 'sg-0bf09b8fc51f350ed'
    }); */
    
    const vpcLink = new VpcLinkHelper(this,'VPCPrivateSosa', {
      isVpcLinkExists: process.env.VPC_LINK ? true : false,
      vpcLinkId: process.env.VPC_LINK ? process.env.VPC_LINK :'',
      vpc: vpcClass.getVpc()
    });

    /*const listener = elb.getElb().addListener('listener', { port: 80 });
    listener.addTargets('target', {
      port: 80,
    });*/

    const listener = elb.getEventListener(this,'ListenerGet','arn:aws:elasticloadbalancing:us-east-1:642537107330:listener/app/test-balancer/e1e8539535642d5a/a566ee4a06e667e3')
    
    const albHttp = new HttpAlbIntegration({
      listener,
      vpcLink:vpcLink.getVpcLink()
    })

    const httpEndpoint = new HttpApi(this, 'HttpProxyPrivateApi');
    httpEndpoint.addVpcLink(vpcLink.getVpcLink())
    httpEndpoint.addRoutes({
      path: '/test',
      methods: [ HttpMethod.GET ],
      integration: albHttp,
    });
    httpEndpoint.addRoutes({
      path: '/test',
      methods: [ HttpMethod.POST ],
      integration: albHttp,
    });
  }
}
