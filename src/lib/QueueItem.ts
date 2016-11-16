
import {Signal} from "seng-signals";
import {Queue} from "./Queue";

export class QueueItem
{
	public complete:Signal = new Signal();
	private _queue:Queue<any> = null;

	public setQueue(queue:Queue<any>):void
	{
		this._queue = queue;
	}

	public then(complete:() => any):this
	{
		this.complete.connect(complete);
		return this;
	}

	public finish():this
	{
		this.complete.emit();
		return this;
	}

	public destruct():void
	{
		this.complete = null;
	}
}
