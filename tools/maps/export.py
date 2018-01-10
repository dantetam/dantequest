#!/usr/bin/env python
import subprocess
import sys

SRC_FILE = 'tmx/map.tmx'

TEMP_FILE = 'temp.json'

mode = sys.argv[1] if len(sys.argv) > 1 else 'client'
if mode == 'client':
    DEST_FILE = '../../client/maps/world_client' # This will save two files (See exportmap.js)
else:
    DEST_FILE = '../../server/maps/world_server.json'

# Convert the Tiled TMX file to a temporary JSON file
print(subprocess.getoutput('python ./tmx2json.py '+SRC_FILE+' '+TEMP_FILE))

# Map exporting
print(subprocess.getoutput('node ./exportmap.js '+TEMP_FILE+' '+DEST_FILE+' '+mode))

# Remove temporary JSON file
print(subprocess.getoutput('rm '+TEMP_FILE))

# Send a Growl notification when the export process is complete
# print(subprocess.getoutput('growlnotify --appIcon Tiled -name "Map export complete" -m "'+DEST_FILE+' was saved"'))