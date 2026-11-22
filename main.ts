import{readFileSync,readdirSync,mkdirSync,writeFileSync}from"node:fs";
import{join}from"node:path";
const I=process.env.MAKEFUN_INPUT_DIR??"/input",O=process.env.MAKEFUN_OUTPUT_DIR??"/output";
function run(p,q){
let D=new Int32Array(256),sp=0,K=new Int32Array(64),kp=0,M=new Int32Array(256),o=new Uint8Array(65536),l=0,n=p.length,pc=0,st=0,ip=0;
const f=x=>[o.slice(0,l),x];
for(;;){
if(st>=1e6)return f(10);
if(pc<0||pc>=n)return f(9);
let b=p[pc],m=b==1?1:b==2?4:b>47&&b<52?2:0;
if(pc+m>=n)return f(9);
st++;pc+=1+m;
if(b<8){
if(b==0)return f(0);
if(b==1){if(sp>255)return f(3);D[sp++]=(p[pc-1]<<24)>>24}
else if(b==2){if(sp>255)return f(3);D[sp++]=p[pc-4]|p[pc-3]<<8|p[pc-2]<<16|p[pc-1]<<24}
else if(b==3){if(!sp)return f(2);sp--}
else if(b==4){if(!sp)return f(2);if(sp>255)return f(3);D[sp]=D[sp-1];sp++}
else if(b==5){if(sp<2)return f(2);let t=D[sp-1];D[sp-1]=D[sp-2];D[sp-2]=t}
else if(b==6){if(sp<2)return f(2);if(sp>255)return f(3);D[sp]=D[sp-2];sp++}
else{if(sp<3)return f(2);let a=D[sp-3];D[sp-3]=D[sp-2];D[sp-2]=D[sp-1];D[sp-1]=a}
continue}
if(b>15&&b<35&&b!=23&&b!=27&&b!=31){
if(sp<2)return f(2);
let y=D[sp-1],x=D[sp-2],r;
if(b>18&&b<23&&!y)return f(4);
r=b==16?(x+y)|0:b==17?(x-y)|0:b==18?Math.imul(x,y):b==19?x==-2147483648&&y==-1?x:(x/y)|0:b==20?y==-1?0:x%y|0:b==21?((x>>>0)/(y>>>0))|0:b==22?(x>>>0)%(y>>>0)|0:b==24?x&y:b==25?x|y:b==26?x^y:b==28?x<<(y&31):b==29?x>>(y&31):b==30?(x>>>(y&31))|0:b==32?x==y?1:0:b==33?x<y?1:0:x>>>0<y>>>0?1:0;
D[sp-2]=r;sp--;continue}
if(b==23){if(!sp)return f(2);D[sp-1]=-D[sp-1]|0;continue}
if(b==27){if(!sp)return f(2);D[sp-1]=~D[sp-1];continue}
if(b>47&&b<52){
let r=((p[pc-2]|p[pc-1]<<8)<<16)>>16;
if(b==51){if(kp==64)return f(7);K[kp++]=pc;pc=p[pc-2]|p[pc-1]<<8}
else{let t=1;if(b>48){if(!sp)return f(2);let v=D[--sp];t=b==49?v==0:v!=0}if(t)pc+=r}
continue}
if(b==52){if(!kp)return f(8);pc=K[--kp];continue}
if(b==64){if(!sp)return f(2);let a=D[sp-1];if(a<0||a>255)return f(6);D[sp-1]=M[a];continue}
if(b==65){if(sp<2)return f(2);let a=D[sp-1],v=D[sp-2];if(a<0||a>255)return f(6);sp-=2;M[a]=v;continue}
if(b==80){if(!sp)return f(2);let t=String(D[sp-1]);if(l+t.length>65536)return f(11);sp--;for(let c of t)o[l++]=c.charCodeAt(0);continue}
if(b==81){if(!sp)return f(2);if(l>=65536)return f(11);o[l++]=D[--sp]&255;continue}
if(b==82){if(sp>255)return f(3);D[sp++]=ip<q.length?q[ip++]:-1;continue}
if(b==83){if(!sp)return f(2);return f(D[--sp]&255)}
return f(5)
}
}
for(const id of readdirSync(I).sort()){
let r=run(new Uint8Array(readFileSync(join(I,id,"program.bin"))),new Uint8Array(readFileSync(join(I,id,"input.bin"))));
mkdirSync(join(O,id),{recursive:true});
writeFileSync(join(O,id,"stdout.bin"),r[0]);
writeFileSync(join(O,id,"exit.txt"),r[1]+"\n")
}
