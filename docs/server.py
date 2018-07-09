#-*- coding: utf-8 -*-
#wasm 호스팅용 간단서버. 

import SimpleHTTPServer
import SocketServer


PORT = 8088

class Handler(SimpleHTTPServer.SimpleHTTPRequestHandler):
    pass

#Handler.extensions_map['.shtml'] = 'text/html'
Handler.extensions_map['.wasm'] = 'application/wasm'

httpd = SocketServer.TCPServer(("", PORT), Handler)

print "serving at port", PORT
httpd.serve_forever()
