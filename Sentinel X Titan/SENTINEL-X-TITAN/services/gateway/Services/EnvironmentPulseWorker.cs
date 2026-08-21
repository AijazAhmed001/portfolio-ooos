namespace SentinelX.Gateway.Services;
public sealed class EnvironmentPulseWorker(LabStateService lab):BackgroundService{
 protected override async Task ExecuteAsync(CancellationToken stoppingToken){while(!stoppingToken.IsCancellationRequested){foreach(var m in lab.Machines){if(m.Status=="HEALTHY"){m.Cpu=Math.Clamp(m.Cpu+Random.Shared.Next(-2,3),10,48);m.Network=Math.Clamp(m.Network+Random.Shared.Next(-3,4),5,42);}}await Task.Delay(TimeSpan.FromSeconds(4),stoppingToken);}}
}
