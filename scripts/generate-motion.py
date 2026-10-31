"""Render GCP's original vector-style motion graphics as looping GIF assets."""

from pathlib import Path
from PIL import Image, ImageDraw, ImageFont, ImageFilter
import math
import sys

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / 'public' / 'assets' / 'motion'
OUT.mkdir(parents=True, exist_ok=True)
SIZE, FRAMES = 640, 64
BG = (239, 237, 232)
WINE = (135, 12, 43)
FONT = ImageFont.truetype(str(ROOT / 'public/assets/fonts/font-2.ttf'), 13)
SMALL = ImageFont.truetype(str(ROOT / 'public/assets/fonts/font-0.ttf'), 10)
BIG = ImageFont.truetype(str(ROOT / 'public/assets/fonts/font-3.ttf'), 63)


def base():
    im = Image.new('RGB', (SIZE, SIZE), BG)
    d = ImageDraw.Draw(im)
    for x in range(32, SIZE, 32):
        for y in range(32, SIZE, 32):
            d.ellipse((x, y, x+1, y+1), fill=(215, 212, 205))
    return im


def dot(d, x, y, r, fill):
    d.ellipse((x-r, y-r, x+r, y+r), fill=fill)


def ring(d, cx, cy, rx, ry, angle, color, width=1):
    pts = []
    for i in range(181):
        t = i / 180 * math.tau
        x, y = rx*math.cos(t), ry*math.sin(t)
        pts.append((cx+x*math.cos(angle)-y*math.sin(angle), cy+x*math.sin(angle)+y*math.cos(angle)))
    d.line(pts, fill=color, width=width)
    return pts


def sphere(im, cx, cy, r, color):
    r = int(r)
    layer = Image.new('RGBA', (2*r+4, 2*r+4), (0, 0, 0, 0))
    pixels = layer.load()
    for y in range(2*r+1):
        for x in range(2*r+1):
            dx, dy = (x-r)/r, (y-r)/r
            rr = dx*dx+dy*dy
            if rr <= 1:
                z = math.sqrt(1-rr)
                light = max(0, -.45*dx-.5*dy+.75*z)
                c = tuple(max(0,min(255,int(v*(.56+.45*light)+38*light))) for v in color)
                pixels[x,y]=(*c,255)
    im.paste(layer, (int(cx)-r, int(cy)-r), layer)


def pill(d, box, text):
    d.rounded_rectangle(box, radius=4, fill=(249,248,245), outline=(209,205,198), width=1)
    x,y,x2,y2=box
    d.text(((x+x2)/2,(y+y2)/2),text,font=SMALL,fill=(83,79,74),anchor='mm')


def connections(t):
    im=base();d=ImageDraw.Draw(im)
    ring(d,320,325,243,149,-.48,(176,170,159))
    ring(d,320,325,212,197,.6,(211,205,195))
    ring(d,320,325,270,230,0,(224,220,213))
    a=t*math.tau
    for k in range(7):
        q=a+k*math.tau/7
        x=320+243*math.cos(q)*math.cos(-.48)-149*math.sin(q)*math.sin(-.48)
        y=325+243*math.cos(q)*math.sin(-.48)+149*math.sin(q)*math.cos(-.48)
        dot(d,x,y,6 if k%3==0 else 3,WINE if k%3==0 else (105,102,96))
    shadow=Image.new('RGBA',im.size);sd=ImageDraw.Draw(shadow)
    sd.ellipse((185,430,455,480),fill=(38,27,25,32));shadow=shadow.filter(ImageFilter.GaussianBlur(14));im=Image.alpha_composite(im.convert('RGBA'),shadow).convert('RGB')
    s=math.sin(a)*5
    sphere(im,275,340+s,112,(148,147,143))
    sphere(im,377,375-s,98,(225,222,216))
    sphere(im,360,241+s,72,WINE)
    d=ImageDraw.Draw(im)
    d.text((320,348+s),'GCP',font=BIG,fill=(25,24,23),anchor='mm')
    pill(d,(394,119,514,151),'PERSPECTIVE')
    pill(d,(60,421,170,453),'PEOPLE')
    pill(d,(420,480,540,512),'PROGRESS')
    d.line((409,151,388,181),fill=(186,179,167),width=1)
    d.line((170,437,204,413),fill=(186,179,167),width=1)
    d.line((447,480,417,444),fill=(186,179,167),width=1)
    d.text((43,40),'GCP / CONNECTED THINKING',font=SMALL,fill=(135,124,111))
    d.text((43,599),'EXPERIENCE IN MOTION',font=SMALL,fill=(135,124,111))
    return im


def flow(t):
    im=base();d=ImageDraw.Draw(im)
    coords=[(138,396),(262,332),(385,268),(505,205)]
    for x,y in coords:
        d.polygon([(x-47,y+20),(x,y+47),(x+47,y+20),(x,y-7)],outline=(204,198,188),fill=(226,222,214))
    for i,(x,y) in enumerate(coords):
        v=(math.sin(t*math.tau-i*.6)+1)/2
        h=70+18*i+v*10
        col=WINE if i==2 else ((70,68,65) if i==3 else (170,167,161))
        d.polygon([(x-31,y+15),(x-31,y-h),(x,y-h+18),(x,y+33)],fill=tuple(int(c*.8) for c in col))
        d.polygon([(x,y+33),(x,y-h+18),(x+31,y-h),(x+31,y+15)],fill=col)
        d.polygon([(x-31,y-h),(x,y-h-18),(x+31,y-h),(x,y-h+18)],fill=tuple(min(255,c+30) for c in col))
    path=[(80,473),(217,473),(217,405),(342,405),(342,340),(481,340),(481,280),(564,280)]
    d.line(path,fill=(150,130,128),width=2)
    lengths=[math.dist(path[i],path[i+1]) for i in range(len(path)-1)];length=sum(lengths)
    for offset in [0,.33,.66]:
        pos=((t+offset)%1)*length
        for i,l in enumerate(lengths):
            if pos<=l:
                f=pos/l; x=path[i][0]*(1-f)+path[i+1][0]*f;y=path[i][1]*(1-f)+path[i+1][1]*f
                dot(d,x,y,5,WINE);break
            pos-=l
    pill(d,(68,499,210,535),'CLARITY')
    pill(d,(248,499,390,535),'CONFIDENCE')
    pill(d,(429,499,571,535),'PROGRESS')
    d.text((43,40),'GCP / MOMENTUM BY DESIGN',font=SMALL,fill=(135,124,111))
    return im


def people(t):
    im=base();d=ImageDraw.Draw(im);a=t*math.tau
    positions=[(320+math.cos(i*math.tau/5-1.57)*185,318+math.sin(i*math.tau/5-1.57)*185) for i in range(5)]
    for i,(x,y) in enumerate(positions):
        d.line((320,318,x,y),fill=(190,184,175),width=1)
        f=(t+i*.2)%1
        dot(d,320+(x-320)*f,318+(y-318)*f,4,WINE)
    ring(d,320,318,185,185,0,(206,200,190))
    for i,(x,y) in enumerate(positions):
        y+=math.sin(a+i)*3
        d.ellipse((x-42,y-42,x+42,y+42),fill=(248,247,243),outline=(195,187,176),width=1)
        dot(d,x,y-9,11,WINE if i==0 else (106,104,99))
        d.rounded_rectangle((x-20,y+7,x+20,y+24),radius=9,fill=WINE if i==0 else (106,104,99))
    sphere(im,320,318,73,WINE)
    d=ImageDraw.Draw(im);d.text((320,317),'GCP',font=ImageFont.truetype(str(ROOT/'public/assets/fonts/font-3.ttf'),30),fill=(255,248,247),anchor='mm')
    d.text((43,40),'GCP / PEOPLE AT THE CENTER',font=SMALL,fill=(135,124,111))
    pill(d,(188,554,453,589),'INDIVIDUAL EXPERTISE. SHARED PURPOSE.')
    return im


def network(t):
    im=base();d=ImageDraw.Draw(im);a=t*math.tau
    for i in range(7):
        y=145+i*52
        pts=[(80+k*4,y+math.sin(k*.06+i*.5+a)*22) for k in range(121)]
        d.line(pts,fill=WINE if i==3 else (193,185,172),width=2 if i==3 else 1)
        f=(t+i*.15)%1;k=f*120;x=80+k*4;yy=y+math.sin(k*.06+i*.5+a)*22
        dot(d,x,yy,5 if i==3 else 3,WINE if i==3 else (99,96,88))
    for x in [180,320,460]:
        d.line((x,105,x,522),fill=(214,207,197),width=1)
    pill(d,(77,551,210,587),'BUSINESS')
    pill(d,(248,551,390,587),'TECHNOLOGY')
    pill(d,(429,551,562,587),'PEOPLE')
    d.text((43,40),'GCP / EXPERTISE, CONNECTED',font=SMALL,fill=(135,124,111))
    return im


for name,draw in [('connections',connections),('momentum',flow),('people',people),('expertise',network)]:
    if len(sys.argv)>1 and name not in sys.argv[1:]: continue
    frames=[]
    for i in range(FRAMES):
        frame=draw(i/FRAMES)
        if i==0:frame.save(OUT/f'{name}-poster.png',optimize=True)
        frames.append(frame.quantize(colors=64,method=Image.Quantize.MEDIANCUT,dither=Image.Dither.NONE))
    frames[0].save(OUT/f'{name}.gif',save_all=True,append_images=frames[1:],duration=90,loop=0,optimize=True,disposal=1)
    print(name,(OUT/f'{name}.gif').stat().st_size,flush=True)
