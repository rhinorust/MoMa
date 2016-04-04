using Moma;
using Xamarin.Forms;
using Xamarin.Forms.Platform.Android;
using Moma.Droid;
using Color = Android.Graphics.Color;
using TextAlignment = Android.Views.TextAlignment;

[assembly: ExportRenderer(typeof(CustomPicker), typeof(CustomPickerRenderer))]
namespace Moma.Droid
{
    class CustomPickerRenderer : PickerRenderer
    {
        protected override void OnElementChanged(ElementChangedEventArgs<Xamarin.Forms.Picker> e)
        {
            base.OnElementChanged(e);

            this.Control.TextAlignment = TextAlignment.Center;

            this.Control.SetTextColor(Color.Gray);
        }
    }
}