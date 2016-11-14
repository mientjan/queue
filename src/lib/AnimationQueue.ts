import {Queue} from "./Queue";
import {AnimationQueueItem} from "./AnimationQueueItem";
import {modulo} from "./modulo";

export class AnimationQueue extends Queue
{
	protected frame:number = 0;

	/**
	 * Will stop
	 * @property _freeze
	 * @type {boolean}
	 */
	private _freeze:boolean = false;

	protected _time:number = 0;
	protected _fpms:number = 0;

	public current:AnimationQueueItem = null;

	constructor(fps:number, unit:number = 1000)
	{
		super();
		this._fpms = unit / fps;
	}


	public tick(delta:number):void
	{
		var time = this._time += delta;

		if(this.current != null)
		{
			var current = this.current;
			var from = current.from;
			var duration = current.duration;
			var times = current.times;
			var frame = (duration * time / (duration * this._fpms));

			if(times != -1 && times - (frame / duration) < 0)
			{

			} else {
				this.frame = from + (frame % duration);
			}
		}
		//
		// if((this.current != null || this.next() != null) )
		// {
		// 	var current = this.current;
		// 	var from = current.from;
		// 	var duration = current.duration;
		// 	var times = current.times;
		// 	var frame = (duration * time / (duration * this._fpms));
		//
		// 	if(times > -1 && times - (frame / duration) < 0) {
		// 		this.next();
		// 	} else {
		// 		this.frame = from + modulo(frame,duration);
		// 	}
		// }
	}

	public hasStopped():boolean
	{
		return !this.current && !this.hasNext();
	}

	public next():AnimationQueueItem
	{
		var next = <AnimationQueueItem> super.next();
		if(next) {
			this.reset();
		}
		return next;
	}

	public getFrame():number
	{
		return this.frame;
	}

	protected reset():void
	{
		this._freeze = false;
		this._time = modulo(this._time, this._fpms);
	}
}


