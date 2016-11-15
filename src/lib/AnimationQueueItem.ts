import {QueueItem} from "./QueueItem";

export class AnimationQueueItem extends QueueItem
{

	public label:string;
	public from:number;
	public to:number;
	public duration:number;

	public times:number;
	public delay:number;
	private _complete:Function = null;

	constructor(label:string, from:number, to:number, times:number = 1, delay:number = 0)
	{
		super();

		if(from < 0)
		{
			throw new Error('from can only be equal or greater than 0');
		}

		if(to < 0)
		{
			throw new Error('to can only be equal or greater than 0');
		}

		this.label = label;
		this.from = from;
		this.to = to;
		this.duration = to - from;
		this.times = times;
		this.delay = delay;
	}

	public destruct():void
	{
		this.label = null;
		this._complete = null;
	}
}
