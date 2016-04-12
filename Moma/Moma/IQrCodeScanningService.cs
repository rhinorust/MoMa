using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Moma
{
   public interface IQrCodeScanningService
    {
        Task<string> ScanAsync();
        int getNumberQRCodes();
    }
}
