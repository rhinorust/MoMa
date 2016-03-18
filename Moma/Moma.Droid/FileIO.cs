using System.IO;
using System.Reflection;

namespace App1.Droid
{
    class FileIO
    {
        // returns the contents of Moma.Droid/Assets/Content/fileName
        public string fileToString(string fileName)
        {
            Assembly assembly = Assembly.GetExecutingAssembly();
            StreamReader stream = new StreamReader(assembly.GetManifestResourceStream("App1.Droid.Assets.Content." + fileName));
            return stream.ReadToEnd();
        }

        // For debugging. Prints a list of all the embedded resources files
        public void printEmbeddedResources()
        {
            Assembly assembly = Assembly.GetExecutingAssembly();
            string[] resources = assembly.GetManifestResourceNames();
            foreach (string resource in resources)
            {
                System.Diagnostics.Debug.WriteLine(resource);
            }
        }
    }
}