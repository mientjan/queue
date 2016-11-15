import {Queue} from "./Queue";
import {AnimationQueueItem} from "./AnimationQueueItem";
import {modulo} from "./modulo";

export class AnimationQueue extends Queue<AnimationQueueItem>
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

	constructor(fps:number = 24, unit:number = 1000)
	{
		super();
		this._fpms = unit / fps;
	}

	public add(item: AnimationQueueItem): this
	{
		if(!this.hasNext())
		{
			this.frame = item.from;
		}

		super.add(item);
		return this;
	}

	public addTime(delta:number):void
	{
		this._time += delta;
		this.calculateFrame();
	}

	public setTime(time:number):void
	{
		this._time = time;
		this.calculateFrame();
	}

	protected calculateFrame():void
	{
		var time = this._time;

		if(this.current != null || this.next() != null)
		{
			var current = this.current;
			var from = current.from;
			var duration = Math.abs(current.duration);
			var to = current.to;
			var times = current.times;
			var frame = (duration * time / (duration * this._fpms));

			if(times != -1 && times - (frame / duration) < 0)
			{
				this.next();
			} else {

				if(from < to)
				{
					this.frame = from + modulo(frame,duration);
				} else {
					this.frame = from + modulo(-frame,-duration);

				}
			}
		}
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

	public getFrameFloat():number
	{
		return this.frame;
	}

	public getFrame():number
	{
		return Math.round(this.frame);
	}

	protected reset():void
	{
		this._freeze = false;
		this._time = modulo(this._time, this._fpms);
	}
}


