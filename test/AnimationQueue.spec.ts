

import {AnimationQueue} from "../lib/AnimationQueue";
import {AnimationQueueItem} from "../lib/AnimationQueueItem";
import {expect} from 'chai';
// import * as sinon from 'sinon';

describe('AnimationQueue', function()
{
	describe('# frame position positive', function()
	{
		var queueItem = new AnimationQueueItem('', 0, 10, -1, 0);
		var queue = new AnimationQueue(24);
		queue.add(queueItem);

		for(var i = 0; i < 30; i++)
		{
			it('time ' + i, function()
			{
				queue.addTime(1000/24 * i);
				expect(queue.getFrame()).to.equal(i);
			});
		}


	});
});
