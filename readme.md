# Blog In A Box

Repository for Blog in a Box project

## WordPress Installation

Blog In A Box comes as two parts:

- WordPress plugin
- CLI utility

### WordPress Plugin

The plugin is installed as per a normal WordPress plugin.

### CLI Utility

The CLI tools should be installed in the following location (default, but can be changed):

`/opt/bloginabox/`

`sudo` access must be given to the `www-data` user so that PHP can call these tools. To do this:

`sudo visudo`

And add this line:

`www-data ALL=(pi:pi) NOPASSWD: /opt/bloginabox/biab`

The WordPress plugin will then have access to the `/opt/bloginabox/biab` CLI tool, and from here can trigger and receive data from hardware devices.
