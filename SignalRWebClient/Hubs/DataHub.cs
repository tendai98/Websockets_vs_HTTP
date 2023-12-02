using System.Diagnostics;
using Microsoft.AspNetCore.SignalR;

namespace SignalRWebClient.Hubs {

    public class DataHub : Hub{
        public async Task ComputeTime(float time){

            Process currentProcess = Process.GetCurrentProcess();
            TimeSpan epoch = DateTime.Now - currentProcess.StartTime;
            
            double epochTime = epoch.TotalMilliseconds / 1000.0f; //DateTimeOffset.UtcNow.Millisecond / 1000.0f;
            
            await Clients.All.SendAsync("Time", epochTime);
        }
    }
}