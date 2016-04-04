using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Moma
{
    public interface IUserSettings
    {
        string GetUserSetting(string setting);
        void SetUserSetting(string setting, string value);
    }
}
