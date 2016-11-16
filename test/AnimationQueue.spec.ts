

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
			it('setTime ' + i, function(i)
			{
				var time = 1000/24 * i;
				queue.setTime(time);
				expect(queue.getFrame(), 'with time ' + queue.getFrame() + ',' + i % 11).to.equal(i % 11);
			}.bind(this, i));
		}

		it('addTime ' + i, function(i)
		{
			var time = 1000/24;
			queue.addTime(time);
			expect(queue.getFrame(), 'with time ' + queue.getFrame() + ',' + i % 11).to.equal(i % 11);
		}.bind(this, i));
	});

	describe('# frame position negative', function()
	{
		var fps = 24;
		var fpms = 1000/fps;
		var queueItem = new AnimationQueueItem('', 20, 15, -1, 0);
		var queue = new AnimationQueue(fps);
		queue.add(queueItem);

		it('setTime 0', function()
		{
			expect(queue.getFrame()).to.equal(20);
		});

		it('setTime 1', function()
		{
			queue.setTime(fpms * 1);
			expect(queue.getFrame()).to.equal(19);
		});

		it('setTime 2', function()
		{
			queue.setTime(fpms * 2);
			expect(queue.getFrame()).to.equal(18);
		});

		it('setTime 3', function()
		{
			queue.setTime(fpms * 3);
			expect(queue.getFrame()).to.equal(17);
		});

		it('setTime 4', function()
		{
			queue.setTime(fpms * 4);
			expect(queue.getFrame()).to.equal(16);
		});

		it('setTime 5', function()
		{
			queue.setTime(fpms * 5);
			expect(queue.getFrame()).to.equal(15);
		});

		it('setTime 6', function()
		{
			queue.setTime(fpms * 6);
			expect(queue.getFrame()).to.equal(20);
		});

		it('setTime 7', function()
		{
			queue.setTime(fpms * 7);
			expect(queue.getFrame()).to.equal(19);
		});
	});
});
