﻿using System;
using Xamarin.Forms;

namespace Moma
{
	public class HybridWebView : View
	{
		Action<string> action;

		public static readonly BindableProperty UriProperty = BindableProperty.Create<HybridWebView, string> (p => p.Uri, default(string));

		public string Uri {
			get { return (string)GetValue (UriProperty); }
			set { SetValue (UriProperty, value); }
		}

		public void RegisterAction (Action<string> callback)
		{
			action = callback;
		}

		public void Cleanup ()
		{
			action = null;
		}

		public void InvokeAction (string data)
		{
			if (action == null || data == null) {
				return;
			}
			action.Invoke (data);
		}
	}
}