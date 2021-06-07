import { expect as expectCDK, matchTemplate, MatchStyle } from '@aws-cdk/assert';
import * as cdk from '@aws-cdk/core';
import * as PrivateLinkStart from '../lib/private-link-start-stack';

test('Empty Stack', () => {
    const app = new cdk.App();
    // WHEN
    const stack = new PrivateLinkStart.PrivateLinkStartStack(app, 'MyTestStack');
    // THEN
    expectCDK(stack).to(matchTemplate({
      "Resources": {}
    }, MatchStyle.EXACT))
});
