
# Headless Blender Renderer

A UI/Server for a headless blender setup, with CPU &amp; GPU monitoring, and more.
Currently only support linux for the time being for actual rendering. Everything else works (even statistics) on windows but not rendering due to some quirks.

Note: Statistics only support NVIDIA gpus at this time. No support for AMD or type of card.
(If you know a way to get statistics for amd similar to nvidia-smi, notify me)

This project is split into two parts: UI, and the Server.
The server runs independently of the UI, and exposes public HTTP routes that you could hook up any client to to check or render.
The UI uses the same routes, but also socket.io for any realtime data (current frame #, logs, statistics). 

# Server Setup

The server setup is a bit messy, but on start the server should generate the necessary folders if you do a full clone of this repository.
There are four essential folders: 
* zips - Where the finished renders will be put
* blends - All the *.blends, and any subfolders they may need.
* python_scripts - Any python scripts to be run, including core scripts
* tmp - This doesn't have to be a subdirectory, but for permission and ease of access it is located as a subdirector by default
* logs - Will be generated from the render scripts, is not autocreated/essential

In the repository there is a folder called scripts, which houses 3 bash scripts: render.sh, renderCPU.sh, renderGPU.sh.
The render.sh handles the setup of the render and the processing when it is complete. The other two simply just run it in its respective mode (CPU, GPU).

Once created, on the UI (The latest UI is also hosted by https://blender.jackz.me!) add your server domain (For example, localhost:8095. You don't need to add /api path, your entered domain is suffixed with /api/...path internally ).

The default admin's username and password is just `admin` (Change this when you login: top right -> settings). The default user can not be deleted or have its details changed by the admin panel.

### Server Environmental Variables

Required:

```env
HOME_DIR - Location of home directory (where zips, blends, and temp would be)
JWT_TOKEN - A secret to generate JWT tokens from
```

Optional:

```env
WEB_PORT - Port of webserver
STAT_UPDATE_INTERVAL_SECONDS - Update interval of GPU/CPU stats
ZIPS_DIR - Location where you want to look for zips
BLENDS_DIR - Location where you want to look for blends
```
