using System;
using System.IO;
using App1.Droid;
using Moma;
using Xamarin.Forms;

[assembly: Dependency(typeof(PersonalPath))]
namespace App1.Droid
{
    public class PersonalPath : IPathFinder
    {
        public string GetFilePathInPersonalFolder(string  fileName)
        {
            string path = Environment.GetFolderPath(Environment.SpecialFolder.Personal);;
            //Remove the first '/', so Path.Combine does not consider it as a relative path
            fileName = RemoveRelativePath(fileName);
            fileName = Path.Combine(path, fileName);
            return fileName;
        }

        private string RemoveRelativePath(string fileName)
        {
            int index = fileName.IndexOf("/", StringComparison.InvariantCulture);
            if (index >= 0)
            {
                fileName = fileName.Substring(index + 1);
            }
            return fileName;
        }

        public void CreateDirectory(string filePath)
        {
            var directory = Path.GetDirectoryName(filePath);
            if (directory != null) Directory.CreateDirectory(directory);
        }

        public string CombinePaths(string firstPath, string secondPath)
        {
            secondPath = RemoveRelativePath(secondPath);
            return Path.Combine(firstPath, secondPath);
        }
    }
}