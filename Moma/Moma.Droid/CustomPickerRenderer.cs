using Moma;
using Moma.Droid;
using Xamarin.Forms;
using Xamarin.Forms.Platform.Android;
using Color = Android.Graphics.Color;
using TextAlignment = Android.Views.TextAlignment;

[assembly: ExportRenderer(typeof (CustomPicker), typeof (CustomPickerRenderer))]

namespace Moma.Droid
{
    internal class CustomPickerRenderer : PickerRenderer
    {
        protected override void OnElementChanged(ElementChangedEventArgs<Picker> e)
        {
            base.OnElementChanged(e);

            Control.TextAlignment = TextAlignment.Center;

            Control.SetTextColor(Color.Gray);
        }
    }
}