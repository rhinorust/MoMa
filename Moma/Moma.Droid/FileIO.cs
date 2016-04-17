using System.Diagnostics;
using System.IO;
using System.Reflection;

namespace App1.Droid
{
    internal class FileIO
    {
        // returns the contents of Moma.Droid/Assets/Content/fileName
        public string fileToString(string fileName)
        {
            var assembly = Assembly.GetExecutingAssembly();
            var stream = new StreamReader(assembly.GetManifestResourceStream("App1.Droid.Assets.Content." + fileName));
            return stream.ReadToEnd();
        }

        // For debugging. Prints a list of all the embedded resources files
        public void printEmbeddedResources()
        {
            var assembly = Assembly.GetExecutingAssembly();
            var resources = assembly.GetManifestResourceNames();
            foreach (var resource in resources)
            {
                Debug.WriteLine(resource);
            }
        }
    }
}