using Microsoft.AspNetCore.Http.Connections;
using SignalRWebClient.Hubs;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddRazorPages();
builder.Services.AddSignalR();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Error");
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseRouting();

app.UseAuthorization();

app.MapRazorPages();
app.MapHub<DataHub>("/time", options => {
    //options.Transports = HttpTransportType.WebSockets;
    options.Transports = HttpTransportType.ServerSentEvents;
    //options.Transports = HttpTransportType.LongPolling;
});

app.Use((context, next)  => 
{
    if(context.Request.Path == "/time"){
        context.Response.Headers.CacheControl = "no-cache,no-store";
        context.Response.Headers.Pragma = "no-cache";
    }

    return next(context);
});

app.Run();
