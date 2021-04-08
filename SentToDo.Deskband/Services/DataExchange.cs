using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Sockets;
using System.Text;
using System.Windows;
using Newtonsoft.Json;
using SentToDo.Deskband.Models;

namespace SentToDo.Deskband.Services
{
    public static class DataExchange
    {
        public static void StartServer()
        {
            MessageBox.Show("Start");
            TcpListener server = null;
            try
            {
                IPAddress localAddr = IPAddress.Parse("127.0.0.1");
                int port = 585;
                server = new TcpListener(localAddr, port);
                
                server.Start();

                while (true)
                {
                    TcpClient client = server.AcceptTcpClient();

                    NetworkStream stream = client.GetStream();
                    StreamReader streamReader = new StreamReader(stream);
                    var line = streamReader.ReadLine();
                    MessageBox.Show(line);

                    ProcessData(line);
                    
                    stream.Close();
                    client.Close();
                }
            }
            catch (Exception e)
            {
                MessageBox.Show(e.ToString());
            }
            finally
            {
                if (server != null)
                    server.Stop();
                
                StartServer();
            }
        }

        public static void ProcessData(string message)
        {
            var data = message.Split('_');
            
            if (data.Length < 2) return;

            var json = String.Join("_", data.Skip(1).Take(data.Length - 1));
            
            switch (data[0])
            {
                case "UPDATETASKS":
                    MessageBox.Show(json);
                    UserControl1.tasks = JsonConvert.DeserializeObject<BindingList<Task>>(json);
                    break;
            }
        }
    }
}