import * as cdk from '@aws-cdk/core';
import { VpcCreate } from '../helpers/VpcCreate';
import { HttpAlbIntegration } from '@aws-cdk/aws-apigatewayv2-integrations';
import { HttpApi, VpcLink, HttpMethod } from '@aws-cdk/aws-apigatewayv2';
import { ElbHelper } from '../helpers/ElbHelper';
import { VpcLinkHelper } from '../helpers/VpcLinkHelper';



export class PrivateLinkStartStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);
    const vpcClass: any = new VpcCreate(this,'MyNewVpc', {
      isAVpcExisting: true,
      vpcId: 'vpc-0fc0d69a75bc70662'
    });

    const elb = new ElbHelper(this, 'EC2Name',{
      isElbExisting: true,
      arn: 'arn:aws:elasticloadbalancing:us-east-1:642537107330:loadbalancer/app/test-balancer/e1e8539535642d5a'
    })

    /* const ecs = new EcsHelper(this, {
      vpc: vpcClass.getVpc(),
      securityGroupId: 'sg-0bf09b8fc51f350ed'
    }); */
    
    const vpcLink = new VpcLinkHelper(this,'VPCPrivateSosa', {
      isVpcLinkExists: true,
      vpcLinkId: '5j3zet'
    });

    const listener = elb.getElb().addListener('listener', { port: 80 });
    listener.addTargets('target', {
      port: 80,
    });
    const albHttp = new HttpAlbIntegration({
      listener,
    })
    const httpEndpoint = new HttpApi(this, 'HttpProxyPrivateApi');
    // httpEndpoint.addRoutes()
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
    /*const apiGateWay = new apigateway.HttpIntegration('/', {
      httpMethod:'any',
      options: {
        vpcLink: vpcLink.getVpcLink(),
        connectionType: ConnectionType.VPC_LINK 
      }
    })*/

    /*const vpc:any = new ec2.Vpc(this, 'VPC');
    
    // const vpc: any = new VpcCreate(this,'PrivateVpcSosa', false);
    const lb = new elbv2.NetworkLoadBalancer(this, 'lb', { vpc });
    const listener = lb.addListener('listener', { port: 80 });
    listener.addTargets('target', {
      port: 80,
    });

    const httpEndpoint = new HttpApi(this, 'HttpProxyPrivateApi', {
      defaultIntegration: new HttpNlbIntegration({
        listener,
      }),
    });*/
    /* const vpcLink: any = new VpcLink(this, 'VpcLink', { vpc });

    const namespace = new servicediscovery.PrivateDnsNamespace(this, 'Namespace', {
      name: 'boobar-sergio-sosa.com',
      vpc,
    });
    const service = namespace.createService('Service');

    const httpEndpoint = new HttpApi(this, 'HttpProxyPrivateApi', {
      defaultIntegration: new HttpServiceDiscoveryIntegration({
        vpcLink,
        service,
      }),
    }); */

    /*const nlb = new elbv2.NetworkLoadBalancer(this,'nlb',{vpc, internetFacing: true})
    const listenerNlb = nlb.addListener('listenerNlb', { port: 80 });
      listener.addTargets('targetNlb', {
        port: 80,
    });*/
    // The code that defines your stack goes here
  }
}
