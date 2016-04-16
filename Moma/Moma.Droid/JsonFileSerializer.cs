using System.Collections.Generic;

namespace App1.Droid
{
    public class JsonFileSerializer
    {
        public List<Floor> floorPlan;
        public Node node;
        public List<Edge> edge;
        public List<Storyline> storyline;
    }

    public class Floor
    {
        public int floorID;
        public string imagePath;
        public int imageWidth;
        public int imageHeight;
    }

    public class Edge
    {
        public string startNode;
        public string endNode;
        public int floorNumber;
        public double distance;
    }

    public class Storyline
    {
        public int id;
        public List<Title> title;
        public List<Description> description;
        public List<string> path;
        public string thumbnail;
        public string walkingTimeInMinutes;
        public List<int> floorsCovered;
    }

    public class Node
    {
        public List<Poi> poi;
        public List<Pot> pot;
    }

    public class Poi
    {
        public string id;
        public List<Title> title;
        public List<Description> description;
        public string x;
        public string y;
        public IBeaconInfo iBeacon;
        public string floorID;
        public Media media;
        public List<StoryPoint> storyPoint;
        public bool autoOn;
    }

    public class Pot
    {
        public int id;
        public string label;
        public int x;
        public int y;
        public int floorID;
    }

    public class Title
    {
        public string language;
        public string title;
    }

    public class Description
    {
        public string language;
        public string description;
    }

    public class IBeaconInfo
    {
        public string uuid;
        public string major;
        public string minor;
    }

    public class Media
    {
        public List<MediaObj> image;
        public List<MediaObj> video;
        public List<MediaObj> audio;
    }

    public class MediaObj
    {
        public string path;
        public string language;
        public string caption;
    }

    public class StoryPoint
    {
        public string ID;
        public string storylineID;
        public List<Title> title;
        public List<Description> description;
        public Media media;
    }
}