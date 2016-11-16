export class Queue<T extends any>
{
	protected _list:Array<T> = [];
	protected _listLength:number = 0;

	public current:T = null;

	public add(item:T):this
	{
		item.setQueue(this);

		this._list.push(item);
		this._listLength++;

		return this;
	}

	public next():T
	{
		if(this._listLength > 0)
		{
			this.current = this._list.shift();
			this._listLength--;
		} else {
			this.current = null;
		}

		return this.current;
	}

	public hasNext():boolean
	{
		return this._listLength > 0;
	}

	public end(all:boolean = false):this
	{
		if(all)
		{
			this._list.length = 0;
			this._listLength = 0;
		}

		return this;
	}

	public kill():this
	{
		this._list.length = 0;
		this._listLength = 0;

		if(this.current)
		{
			let current = this.current;
			this.current = null;
			current.finish();
			current.destruct();
		}

		return this;
	}
}
