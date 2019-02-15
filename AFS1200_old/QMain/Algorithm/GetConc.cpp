#include <stdio.h>
#include <stdlib.h>
#include <math.h>
#include "GetConc.h"
#include "../ID/uIDCardDef.h"


#include <math.h>
#include <stdio.h>

//#include "uMultiFit.h"


double dx[21], dy[21];
double iAllDots;
double CONCS[21],  RESPS[21];  //原来是x,y
int    iDots;
int    iNs[2];
int    iSect;
char   cLogX;
char   cLogY;
int    iFitType;
double dA[16],dA1[16];
double dR,dR1;
double dK,dB;

int    iLead = 0;
int    mp,mq;
double mx0[21], my0[21];
double mx1[21], my1[21];

int    iTrend;
bool   bFit = false;

double(*calcy)(double a[],double x);

int    iMathErr;


double mypow(double x,double y)
{
   iMathErr = 0;
   return pow(x,y);
}

double myexp(double x)
{
   iMathErr = 0;
   return exp(x);
}

double CalcCorrelation(double x[], double y[], int n)
{
   double r;
   double avg_x=0.0, avg_y=0.0;
   double sa_xy=0.0,sa_x2=0.0,sa_y2=0.0;
   double dx,dy;
   for(int i=0; i<n; i++)
   {
      avg_x = avg_x + x[i]/n;
      avg_y = avg_y + y[i]/n;
   }
   for(int i=0; i<n; i++)
   {
      dx    = x[i] - avg_x;
      dy    = y[i] - avg_y;
      sa_xy = sa_xy + dx * dy;
      sa_x2 = sa_x2 + dx * dx;
      sa_y2 = sa_y2 + dy * dy;
   }
   r = sa_xy / (sqrt(sa_x2)*sqrt(sa_y2));
   return r;
}

void LinearFit(double x[],double y[],int n,double a[])
{
   double sx=0.0, sy=0.0, sxy=0.0, sxx=0.0;
   double ddd;
   for (int i=0; i<n; i++ )
   {
      sx  = sx  + x[i];
      sy  = sy  + y[i];
      sxy = sxy + x[i]*y[i];
      sxx = sxx + x[i]*x[i];
   }
   ddd  = ( n * sxx - sx * sx );
   if(ddd==0.0) ddd = 1;
   a[0] = ( sxx * sy - sx * sxy ) / ddd;
   a[1] = ( n * sxy - sx * sy )   / ddd;
}

void gauss_solve(int n,double A[],double x[],double b[])
{
   int i,j,k,r;
   double max1;
   for (k=0;k<n-1;k++)
   {
      max1=fabs(A[k*n+k]);
      r=k;
      for (i=k+1;i<n-1;i++)
      if (max1<fabs(A[i*n+i]))
      {
         max1=fabs(A[i*n+i]);
         r=i;
      }
      if (r!=k)
      for (i=0;i<n;i++)
      {
         max1=A[k*n+i];
         A[k*n+i]=A[r*n+i];
         A[r*n+i]=max1;
      }
      max1=b[k];
      b[k]=b[r];
      b[r]=max1;
      for (i=k+1;i<n;i++)
      {
         for (j=k+1;j<n;j++)
            A[i*n+j]-=A[i*n+k]*A[k*n+j]/A[k*n+k];
         b[i]-=A[i*n+k]*b[k]/A[k*n+k];
      }
   }
   for (i=n-1;i>=0;x[i]/=A[i*n+i],i--)
   for (j=i+1,x[i]=b[i];j<n;j++)
      x[i]-=A[i*n+j]*x[j];
}

void PolynomialFit(double x[],double y[],int n,int poly_n,double a[])
{
   int i,j;
   double *tempx,*tempy,*sumxx,*sumxy,*ata;
   tempx=(double *)calloc(n,sizeof(double));
   sumxx=(double *)calloc(poly_n*2+1,sizeof(double));
   tempy=(double *)calloc(n,sizeof(double));
   sumxy=(double *)calloc(poly_n+1,sizeof(double));
   ata=(double *)calloc((poly_n+1)*(poly_n+1),sizeof(double));
   for ( i=0; i<n; i++ )
   {
      tempx[i]=1;
      tempy[i]=y[i];
   }
   for ( i=0; i<2*poly_n+1; i++ )
   for ( sumxx[i]=0,j=0; j<n; j++ )
   {
      sumxx[i]+=tempx[j];
      tempx[j]*=x[j];
   }
   for (i=0;i<poly_n+1;i++)
   for (sumxy[i]=0,j=0;j<n;j++)
   {
      sumxy[i]+=tempy[j];
      tempy[j]*=x[j];
   }
   for (i=0;i<poly_n+1;i++)
   for (j=0;j<poly_n+1;j++)
      ata[i*(poly_n+1)+j]=sumxx[i+j];
   gauss_solve(poly_n+1,ata,a,sumxy);
   free(tempx);
   free(sumxx);
   free(tempy);
   free(sumxy);
   free(ata);
}

double CalcY(double a[],double x)
{
   return a[0]           +
          a[1]*x         +
          a[2]*x*x       +
          a[3]*x*x*x     +
          a[4]*x*x*x*x   +
          a[5]*x*x*x*x*x +
          a[6]*x*x*x*x*x*x;
}

int SectPoly(double mx0[],
             double my0[],
             int    mp,
             int    iLogX,
             double a[])
{
   double x,y1,y2,xx,jjj;

   double low, upp, xstep, mup, Orss, rss;
   double ma[6][10];
   double aa[10];
   int    iTotal = 0;
   int    iFlag=0, ipn=0;

   memset(ma,0,sizeof(ma));
   if(iLogX==1) xstep = 0.01;
   else xstep = 1;
   low = mx0[0];
   upp = mx0[mp-1] + 0.01;
   if(iLogX) mup = mx0[mp-1]-0.06;
   else mup = mx0[mp-1]*19/20.0;
   for(int i=1; i<=6; i++)
   {
      if(mp<3) break;
      memset(aa,0,sizeof(aa));
      PolynomialFit(mx0,my0,mp,i,aa);
      for(x=low; x<upp; )
      {
         y1 = CalcY(aa,x);
         x  = x + xstep;
         y2 = CalcY(aa,x);
         if(y2<y1) break;
      }
      if( x>=mup )
      {
         memcpy(ma[iTotal],aa,sizeof(aa));
         iTotal++;
      }
   }
   if(iTotal==0) return -1;
   Orss = 10e39;
   for(int i=0; i<iTotal; i++)
   {
      rss = 0;
      for(int j=0; j<mp; j++)
      {
         y1  = CalcY(ma[i],mx0[j]);
         jjj = fabs(my0[j] - y1 );
         rss = rss + jjj*jjj;
      }
      if( rss < Orss )
      {
         Orss  = rss;
         iFlag = i;
      }
   }
   for(int i=0; i<=6; i++)
   {
      a[i] = ma[iFlag][i];
      if(a[i]!=0) ipn = i;
   }
   return ipn;
}

int PiecewisePolynomial(
           double mx[],
           double my[],
           int    iDots,
           int    iLogX,
           int    iPiece,
           double a00[],
           double a11[],
           int    n[])
{
   int k = 0;
   memset(mx0,0,sizeof(mx0));
   memset(my0,0,sizeof(my0));
   memset(mx1,0,sizeof(mx1));
   memset(my1,0,sizeof(my1));
   if(iPiece==0)
   {
      if(n[0]==0)
         n[0] = SectPoly(mx,my,iDots,iLogX,a00);
      else
         PolynomialFit(mx,my,iDots,n[0],a00);
      if(n[0]>0) k = 1;
   } else
   {
      if(iPiece<3) return 0;
      mp = iPiece;
      for(int i=0; i<24; i++)
      {
         if(i<iPiece)
         {
            mx0[i] = mx[i];
            my0[i] = my[i];
         } else
         {
            mx1[i-iPiece] = mx[i-1];
            my1[i-iPiece] = my[i-1];
         }
      }
      mq   = iDots - iPiece + 1;
      if(n[0]==0)
         n[0] = SectPoly(mx0,my0,mp,iLogX,a00);
      else
         PolynomialFit(mx0,my0,mp,n[0],a00);
      if(n[1]==0)
         n[1] = SectPoly(mx1,my1,mq,iLogX,a11);
      else
         PolynomialFit(mx1,my1,mq,n[1],a11);
      if(n[0]>0) k++;
      if(n[1]>0) k++;
   }
   return k;
}

double CalcLinerFit(double a[],double dx)
{
   return a[0]+a[1]*dx;
}

double CalcQuadraticPolynomial(double a[],double dx)
{
   return a[0]+a[1]*dx+a[2]*dx*dx;
}

double CalcExponentialFit(double a[],double dx)
{
   return a[0]*exp(a[1]*dx);
}

double CalcMMF(double a[],double dx)
{
   double a0,a1,a2,a3;
   a0 = a[0];
   a1 = a[1];
   a2 = a[2];
   a3 = a[3];
   double d = a1 + mypow(dx,a3);
   if(d==0.0) return (a0*a1+a2*mypow(dx,a3));
   else return (a0*a1+a2*mypow(dx,a3))/d;
}

double CalcPiecewisePolynomial(double ax[],double dx)
{
   double dy;
   if((dx<CONCS[iSect-1])||(iSect<=0))
      dy = CalcY(dA,dx);
   else dy = CalcY(dA1,dx);
   return dy;
}

double CalcLogistic(double a[],double dx)
{
   double d=(1+a[1]*exp(-a[2]*dx));
   if(d==0.0) return a[0];
   else return a[0]/d;
}

double CalcLinearInter(double a[], double dx)
{
   double dy=-1,dk,db,deltax;
   int i=1,i1,i2;
   while(i<iDots)
   {
      if(CONCS[i]<dx) i++;
      else break;
   }
   if(i==iDots)
   {
      i1 = iDots-2;
      i2 = iDots - 1;
   } else
   {
      i1 = i - 1;
      i2 = i;
   }
   deltax = CONCS[i1]-CONCS[i2];
   if(deltax!=0)
   {
      dk = (RESPS[i1]-RESPS[i2])/deltax;
      db = RESPS[i1] - dk * CONCS[i1];
      dy = dk*dx + db;
   }
   return dy;
}

double threespline(double x[],double y[],int n,
       double dy[], double ddy[],double t[],
       int m,double z[],double dz[],double ddz[])
{
   int i,j;
   double h0,h1,alpha,beta,g,*s,aa,bb,cc;
   s=(double*)malloc(n*sizeof(double));
   dy[0]=-0.5;
   h0=x[1]-x[0];
   s[0]=3.0*(y[1]-y[0])/(2.0*h0)-ddy[0]*h0/4.0;
   for (j=1;j<=n-2;j++)
   {
      h1    = x[j+1]-x[j];
      alpha = h0/(h0+h1);
      beta  = (1.0-alpha)*(y[j]-y[j-1])/h0;
      beta  = 3.0*(beta+alpha*(y[j+1]-y[j])/h1);
      dy[j] = -alpha/(2.0+(1.0-alpha)*dy[j-1]);
      s[j]  = (beta-(1.0-alpha)*s[j-1]);
      s[j]  = s[j]/(2.0+(1.0-alpha)*dy[j-1]);
      h0    = h1;
   }
   dy[n-1]  = (3.0*(y[n-1]-y[n-2])/h1+ddy[n-1]*h1/2.0-s[n-2])/(2.0+dy[n-2]);
   for (j=n-2;j>=0;j--) dy[j] = dy[j]*dy[j+1]+s[j];
   for (j=0;j<=n-2;j++) s[j]  = x[j+1]-x[j];
   for (j=0;j<=n-2;j++)
   {
      h1     = s[j]*s[j];
      ddy[j] = 6.0*(y[j+1]-y[j])/h1-2.0*(2.0*dy[j]+dy[j+1])/s[j];
   }
   h1       = s[n-2]*s[n-2];
   ddy[n-1] = 6.*(y[n-2]-y[n-1])/h1+2.*(2.*dy[n-1]+dy[n-2])/s[n-2];
   g        = 0.0;
   for (i=0;i<=n-2;i++)
   {
      h1 = 0.5*s[i]*(y[i]+y[i+1]);
      h1 = h1-s[i]*s[i]*s[i]*(ddy[i]+ddy[i+1])/24.0;
      g  = g+h1;
   }
   for (j=0;j<=m-1;j++)
   {
      if (t[j]>=x[n-1]) i=n-2;
      else
      {  i=0;
         while (t[j]>x[i+1]) i=i+1;
      }
      h1     = (x[i+1]-t[j])/s[i];
      h0     = h1*h1;
      z[j]   = (3.0*h0-2.0*h0*h1)*y[i];
      z[j]   = z[j]+s[i]*(h0-h0*h1)*dy[i];
      dz[j]  = 6.0*(h0-h1)*y[i]/s[i];
      dz[j]  = dz[j]+(3.0*h0-2.0*h1)*dy[i];
      ddz[j] = (6.0-12.0*h1)*y[i]/(s[i]*s[i]);
      ddz[j] = ddz[j]+(2.0-6.0*h1)*dy[i]/s[i];
      h1     = (t[j]-x[i])/s[i];
      h0     = h1*h1;
      z[j]   = z[j]+(3.0*h0-2.0*h0*h1)*y[i+1];
      z[j]   = z[j]-s[i]*(h0-h0*h1)*dy[i+1];
      dz[j]  = dz[j]-6.0*(h0-h1)*y[i+1]/s[i];
      dz[j]  = dz[j]+(3.0*h0-2.0*h1)*dy[i+1];
      ddz[j] = ddz[j]+(6.0-12.0*h1)*y[i+1]/(s[i]*s[i]);
      ddz[j] = ddz[j]-(2.0-6.0*h1)*dy[i+1]/s[i];
   }
   free(s);
   return(g);
}

double CalcSpline(double ax[], double dx)
{
   double dy;
   double retval;
   double dys[21],ddys[21];
   double t[1],z[1],dz[1],ddz[1];
   t[0] = dx;
   z[0] = 0;
   memset(dys,0,sizeof(dys));
   memset(ddys,0,sizeof(ddys));
   threespline(CONCS,RESPS,iDots,dys,ddys,t,1,z,dz,ddz);
   dy = z[0];
   return dy;
}

double CalcLogarithmFit(double a[],double dx)
{
   if(dx>0) return a[0]+a[1]*log(dx);
   else return a[0];
}

double CalcPowerFit(double a[],double dx)
{
   if( (dx<0.0)||((dx==0.0)&&(a[1]<=0))) return a[0];
   else return a[0]*pow(dx,a[1]);
}

double Calcys(double a[],double x)
{
   double x1,y1;
   if( ( (iLead!=0) && (x<=dx[0]) ) ||
       ( (cLogX!=0) && (x<=0) ) )
   {
      return (dK*x+dB);
   }
   if(x<0) return -1;
   switch(cLogX){
   case 0 : x1 = x; break;
   case 1 : if(x==0) return -1;
            x1 = log10(x);
            break;
   case 2 : if(x==0) return -1;
            x1 = log(x);
            break;
   }
   y1 = calcy(a,x1);
   switch(cLogY){
   case 0 : break;
   case 1 : y1 = pow(10,y1); break;
   case 2 : y1 = exp(y1);    break;
   }
   return y1;
}

bool MultiFit(
                double dxs[],          // x数据数组
                double dys[],          // y数据数组
                int    idots,          // 数据组数
                int    isect,          // 分段位置(如果是分段多项式)
                char   clogx,          // x取对数
                char   clogy,          // y取对数
                int    ifittype,       // 拟合方式
                int    ins[],          // 多项式拟合次数
                double a[],            // 系数
                double a1[],           // 第二段系数(如果是分段多项式)
                double &r)            // 相关系数
{
   double yy[21],x1,y1,deltX;
   int iIncrease = 0, iDecrease = 0;
   for(int i=0; i<idots-1; i++)
   if(dys[i]<dys[i+1]) iIncrease++;
   else iDecrease++;
   if(iIncrease>iDecrease) iTrend = 0;
   else iTrend = 1;
   if( ((iTrend==0)&&
        (ifittype>10)&&
        (ifittype<20))  ||
       ((iTrend==1)&&(ifittype>19)) )
   {
      bFit = false;
      return false;
   }
   iAllDots = idots;
   iDots    = idots;
   iSect    = isect;
   cLogX    = clogx;
   cLogY    = clogy;
   iFitType = ifittype;
   iLead    = 0;
   for(int i=0; i<iAllDots; i++)
   {
      dx[i] = dxs[i];
      dy[i] = dys[i];
   }
   deltX = dx[1] - dx[0];
   if(deltX==0) return false;
   dK = (dy[1]-dy[0]) / deltX;
   dB = (dx[1]*dy[0]-dx[0]*dy[1]) / deltX;
   if(  ( (cLogX>0) ||
          (iFitType==6 ) ||
          (iFitType==8 ) ||
          (iFitType==10) ||
          (iFitType==20) ) &&
        ( dx[0]==0.0 ) )
   {
      iLead = 1;
      iSect--;
      iDots--;
   }
   bFit = true;
   for(int i=iLead; i<iAllDots; i++)
   {
      x1 = dxs[i];
      y1 = dys[i];
      switch(cLogX){
      case 0 : CONCS[i-iLead] = x1; break;
      case 1 : if(x1<=0.0) bFit = false;
               else CONCS[i-iLead] = log10(x1);
               break;
      case 2 : if(x1<=0.0) bFit = false;
               else CONCS[i-iLead] = log(x1);
               break;
      }
      switch(cLogY){
      case 0 : RESPS[i-iLead] = y1;  break;
      case 1 : if(y1<=0.0) bFit = false;
               else RESPS[i-iLead] = log10(y1);
               break;
      case 2 : if(y1<=0.0) bFit = false;
               else RESPS[i-iLead] = log(y1);
               break;
      }
   }
   int izerox = 0, izeroy = 0;
   for(int i=0; i<iDots; i++)
   {
      if(CONCS[i]<0) izerox++;
      if(RESPS[i]<0) izeroy++;
   }
   if( ( (iFitType==2 )&&(izerox>0) ) ||
       ( (iFitType==5 )&&(izerox>0) ) ||
       ( (iFitType==11)&&(izeroy>0) ) ||
       ( (iFitType==18)&&(izerox>0) ) ||
       ( (iFitType==15)&&(izeroy>0) ) ||
       ( (iFitType==14)&&(izeroy>0) ) ||
       ( (iFitType==17)&&(izeroy>0) ) ||
       ( (iFitType==20)&&((izeroy>0)||(izerox>0)))||
       ( (iFitType==6 )&&(izerox>0) ) ||
       ( (iFitType==8 )&&((izerox>0)||(izeroy>0)))||
       ( (iFitType==21)&&(izeroy>0) ) ||
       ( (iFitType==7 )&&(izerox>0) )
       )
      bFit = false;
   if(!bFit) return false;
   switch(iFitType){
   case 0 :
            calcy = CalcLinerFit;
            LinearFit(CONCS,RESPS,iDots,a);
            iNs[0] = 1;
            iNs[1] = 0;
            break;
   case 1 :
            calcy = CalcPiecewisePolynomial;
            PiecewisePolynomial(CONCS,RESPS,iDots,cLogX,iSect,a,a1,ins);
            break;
   case 2 :
            calcy = CalcMMF;
            if(iMathErr>0) bFit = false;
            iNs[0] = 3;
            iNs[1] = 0;
            break;
   case 3 :
            calcy = CalcSpline;
            iNs[0] = 0;
            iNs[1] = 0;
            break;
   case 4 :
            calcy = CalcLogarithmFit;
            iNs[0] = 1;
            iNs[1] = 0;
            break;
   case 5 :
            calcy = CalcPowerFit;
            iNs[0] = 1;
            iNs[1] = 0;
            break;
   case 6 :
            calcy = CalcLogistic;
            iNs[0] = 2;
            iNs[1] = 0;
            break;
   case 7 :
            calcy = CalcExponentialFit;
            iNs[0] = 1;
            iNs[1] = 0;
            break;
   case 8 :
            calcy = CalcLinearInter;
            iNs[0] = 0;
            iNs[1] = 0;
            break;
   }
   if(!bFit) return false;
   memset(yy,0,sizeof(yy));
   for(int i=0; i<iDots; i++ )
      yy[i] = calcy(a,CONCS[i]);
   dR = CalcCorrelation(RESPS,yy,iDots);
   r  = dR;
   return true;
}
/*
double FindY(double x1,
             double x2,
             double cy)
{
   double y;
   double cybbb,ybbb;
   double dMax,dMin;
   char cybuffer[20]={0}; //unsigned
   char ybuffer[20]={0}; //unsigned
   char cmax[20],cmin[20]; //unsigned
   double low  = x1;
   double high = x2;
   double mid;
   double ret  = 0;
   sprintf(cybuffer,"%.10f",cy);
   cybbb=atof(cybuffer);
   dMax = calcy(dA,x2);
   dMin = calcy(dA,x1);
   if( (cy>dMax)||(cy<dMin) ) return 0;
   if(cy==dMax) return x2;
   if(cy==dMin) return x1;
   while(low<high)
   {
      mid = (low + high) / 2;
      y   = calcy(dA, mid);
      sprintf(ybuffer,"%.10f",y);
      ybbb = atof(ybuffer);
      if(cybbb==ybbb)
      {
         ret = mid;
         break;
      }
      if(y<cy) low = mid;
      else high = mid;
      sprintf(cmax,"%.10f",high);
      sprintf(cmin,"%.10f",low);
      high = atof(cmax);
      low  = atof(cmin);
      if(fabs(low-high)<1e-6)
      {
         ret = mid;
         break;
      }
   }
   return ret;
}

double ConcLine(double y1)
{
   double dConc = -1;
   if(dA[1]!=0.0) dConc = (y1-dA[0])/dA[1];
   return dConc;
}

double ConcPolys(double y1)
{
   double dConc = -1;

   return dConc;
}



double ConcLinearInter(double dy)
{
   double dx=-1,dk,db,deltax;
   int i=1,i1,i2;
   while(i<iDots)
   {
      if(RESPS[i]<dy) i++;
      else break;
   }
   if(i==iDots)
   {
      i1 = iDots-2;
      i2 = iDots - 1;
   } else
   {
      i1 = i - 1;
      i2 = i;
   }
   deltax = CONCS[i1]-CONCS[i2];
   if(deltax!=0)
   {
      dk = (RESPS[i1]-RESPS[i2])/deltax;
      db = RESPS[i1] - dk * CONCS[i1];
      dx = (dy-db)/dk;
   }
   return dx;
}

double ConcOther(double y1)
{
   double dConc = -1;
   double x1,x2,y11,y12,xx,yy,mx,dx,dk,db;
   int i = 0;
   while(i<iDots)
   {
      xx = CONCS[i];
      yy = calcy(dA,xx);
      if(yy<=y1)
      {
         i++;
         continue;
      } else break;
   }
   x1 = 0;
   x2 = CONCS[iDots-1]*1.3;
   dConc = FindY(x1,x2,y1);
   return dConc;
}

double CalcConc(double resp)
{
   if(resp<=0) return -1;

   double y1,dConc = -1;
   switch(cLogY){
   case 0 : y1 = resp;        break;
   case 1 : y1 = log10(resp); break;
   case 2 : y1 = log(resp);   break;
   }
   double x1,x2,y11,y12,xx,yy,mx,dx,dk,db;
   int i = 0;
   while(i<iDots)
   {
      xx = CONCS[i];
      yy = calcy(dA,xx);
      if(yy<=y1)
      {
         i++;
         continue;
      } else break;
   }
   if(iFitType==8)
   {
      dConc = ConcLinearInter(y1);
   } else
   {
      if(i==0)
      {
         if(CONCS[0]>0.0) x1 = CONCS[0]*0.1;
         else x1 = CONCS[0]*10;
         x2    = CONCS[0];
         dConc = FindY(x1,x2,y1);
      } else if((i>0)&&(i<iDots))
      {
         dConc = FindY(CONCS[i-1],CONCS[i],y1);
      } else if(i>=iDots-1)
      {
         x1  = CONCS[iDots-1];
         x2  = x1*1.5;
         dConc = FindY(x1,x2,y1);
         if(dConc==0.0)
         {
            x2  = CONCS[iDots-2];
            y11 = RESPS[iDots-1];
            y12 = RESPS[iDots-2];
            dx  = x2 - x1;
            dk  = (y12-y11)/dx;
            db  = (x2*y11-x1*y12)/dx;
            dConc = (y1 - db)/dk;
         }
      }
   }
   switch(cLogX){
   case 0 : break;
   case 1 : dConc = pow(10.0,dConc); break;
   case 2 : dConc = exp(dConc);      break;
   }
   return dConc;
}*/
//------------------------------------------------------------------------------
// 根据提供的多项式参数,自变量的区间,查找指定因变量对应的自变量的值,找不到返回0
//------------------------------------------------------------------------------
double FindY(double x1,                          // 自变量区间小值
             double x2,                          // 自变量区间大值
             double cy)                          // 因变量y值
{
   double y;
   double cybbb,ybbb;
   double dMax,dMin;
   char cybuffer[20]={0};  //unsigned
    char ybuffer[20]={0};  //unsigned
    char cmax[20],cmin[20];  //unsigned
   double low  = x1;
   double high = x2;
   double mid;                                   // 当前查找区间上,下界及中点的初值
   double ret  = 0;
   sprintf(cybuffer,"%.10f",cy);
   cybbb=atof(cybuffer);
   if(iTrend==0)                                 // 上升趋势最大值最小值
   {
      dMax = calcy(dA,x2);
      dMin = calcy(dA,x1);
   } else                                        // 下降趋势最大最小值
   {
      dMin = calcy(dA,x2);
      dMax = calcy(dA,x1);
   }
   if( (cy>dMax)||(cy<dMin) ) return 0;          // 越界返回0
   if(iTrend==0)                                 // 上升趋势边界值
   {
      if(cy==dMax) return x2;
      if(cy==dMin) return x1;
   } else                                        // 下降趋势边界值
   {
      if(cy==dMax) return x1;
      if(cy==dMin) return x2;
   }
   while(low<high)
   {
      mid = (low + high) / 2;                    // 取区间的中间点计算
      y   = calcy(dA, mid);
      sprintf(ybuffer,"%.10f",y);
      ybbb = atof(ybuffer);
      if(cybbb==ybbb)
      {
         ret = mid;
         break;
      }
      if(iTrend==0)                              // 上升曲线
      {
         if(y<cy) low = mid;                     // 继续在R[mid+1..high]中查找
         else high = mid;                        // 继续在R[low..mid-1]中查找
      } else
      {
         if(y>cy) low = mid;                     // 继续在R[mid+1..high]中查找
         else high = mid;                        // 继续在R[low..mid-1]中查找
      }
      sprintf(cmax,"%.10f",high);
      sprintf(cmin,"%.10f",low);
      high = atof(cmax);
      low  = atof(cmin);
      if(fabs(low-high)<1e-6)
      {
         ret = mid;
         break;
      }
   }
   return ret;
}
double ConcPolys(double y1)
{
   double dConc = -1;

   return dConc;
}
double ConcLine(double y1)
{
   double dConc = -1;
   if(dA[1]!=0.0) dConc = (y1-dA[0])/dA[1];
   return dConc;
}
double ConcLinearInter(double dy)
{
   double dx=-1,dk,db,deltax;
   int i=1,i1,i2;
   while(i<iDots)                                // 先定位所在区间
   {
      if(iTrend==0)                              // 上升曲线区间定位
      {
         if(RESPS[i]<dy) i++;
         else break;
      } else                                     // 下降曲线区间定位
      {
         if(RESPS[i]>dy) i++;
         else break;
      }
   }
   if(i==iDots)                                  // 最后一个点之后
   {
      i1 = iDots-2;
      i2 = iDots - 1;
   } else
   {
      i1 = i - 1;
      i2 = i;
   }
   deltax = CONCS[i1]-CONCS[i2];
   if(deltax!=0)
   {
      dk = (RESPS[i1]-RESPS[i2])/deltax;
      db = RESPS[i1] - dk * CONCS[i1];
      dx = (dy-db)/dk;
   }
   return dx;
}


double ConcOther(double y1)
{
   double dConc;
   double x1,x2,y11,y12,xx,yy,mx,dx,dk,db;
   int i = 0;
   while(i<iDots)                                // 先粗略定位所在区间
   {
      xx = CONCS[i];  //--->x[i] 改为CONCS[i];
      yy = calcy(dA,xx);
      if(iTrend==0)
      {
         if(yy<=y1)
         {
            i++;
            continue;
         } else break;
      } else
      {
         if(yy>=y1)
         {
            i++;
            continue;
         } else break;
      }
   }
   if(i==0)
   {
      if(CONCS[0]>0.0) x1 = CONCS[0]*0.1;             // 拟合的x值为正数,则取第一个点的1/10开始       --->x[i] 改为CONCS[i];//;
      else x1 = CONCS[0]*10;                      // 负数则取更小值开始
      x2    = CONCS[0];                                 //--->x[i] 改为CONCS[i];
      dConc = FindY(x1,x2,y1);
   } else if((i>0)&&(i<iDots))                // 荧光值在方程中点的范围内
   {
      dConc = FindY(CONCS[i-1],CONCS[i],y1);          // 精确查找浓度值
   } else if(i>=iDots-1)                      // 荧光值比最大值大
   {
      x1  = CONCS[iDots-1];                       // 在最后一个浓度值--->x[i] 改为CONCS[i];
      x2  = x1*1.5;                           // 到最后一个浓度值的1.5倍之间搜索
      dConc = FindY(x1,x2,y1);                // 精确查找浓度值
      if(dConc==0.0)                          // 没有精确查找到浓度值,则最后两个点直线拟合
      {
         x2  = CONCS[iDots-2];                    // 倒数第二个浓度
         y11 = RESPS[iDots-1];                    //
         y12 = RESPS[iDots-2];                    //
         dx  = x2 - x1;                       //
         dk  = (y12-y11)/dx;                  // 计算直线斜率
         db  = (x2*y11-x1*y12)/dx;            // 直线截距
         dConc = (y1 - db)/dk;
      }
   }
   return dConc;
}
//------------------------------------------------------------------------------
//  由提供的反应值根据标准品浓度,反应值以及分段函数的参数反求浓度
//------------------------------------------------------------------------------
double CalcConc(double resp)                     // 根据tc计算浓度
{
   if(resp<=0) return -1;                        // 反应值不能小于等于0

   double y1,dConc = -1;                         //
   switch(cLogY){
   case 0 : y1 = resp;        break;             // 不取对数
   case 1 : y1 = log10(resp); break;             // 反应值取10为底的对数
   case 2 : y1 = log(resp);   break;             // 反应值取自然对数
   }
   switch(iFitType){
   case 0 : dConc = ConcLine(y1);        break;  // 直线拟合
   case 8 : dConc = ConcLinearInter(y1); break;  // 线性插值
   default: dConc = ConcOther(y1);       break;  // 其它拟合
   }
   switch(cLogX){
   case 0 : break;
   case 1 : dConc = pow(10.0,dConc); break;
   case 2 : dConc = exp(dConc);      break;
   }
   return dConc;
}





















//------------------------------------------------------------------------------
//  由提供的反应值根据标准品浓度,反应值以及分段函数的参数反求浓度
//------------------------------------------------------------------------------
double old_GetConc(double mtc,               // 反应值
               double mx[],              // 标准品浓度
               double my[],              // 标准品反应值
               unsigned char m_SubFlag,  // 分段标志
               unsigned char m_LogB,     // 取对数标志
               double a0[],              // 两段的参数
               double a1[],
               int L,                    // 点数
               int p)                    // 分段位置
{
   double mX0[16],mX1[16],mY0[16] ,mY1[16];
   int i,j,mp,mq;
   double mtx=0,x0=0,y0=0;
   double yy,xx,dy,ik;
   for(i=0; i<16; i++)
   {
      mX0[i] = 0.0;  mY0[i] = 0.0;
      mX1[i] = 0.0;  mY1[i] = 0.0;
   }
   //----2015-10-28修改 小于第一个点的反应值,直接直线拟合1,2点然后计算----------
   double k,b;
   if( ((mtc<my[0])&&(!m_LogB)) ||               // 不取对数,小于第一个点
       (m_LogB&&(mtc<my[1])) )                   // 取对数，小于第二个点
   {
      k = (my[1]-my[0])/(mx[1]-mx[0]);
      b = (mx[1]*my[0]-mx[0]*my[1])/(mx[1]-mx[0]);
      if(k==0.0) mtx = -1;
      else mtx = (mtc-b)/k;
      return mtx;
   }
   //--15-10-28修改结束---------------------------------------------------------
   if(m_SubFlag)                                 // 如果分段
   {
      if(p<5) return 0;
      mp = p;                                    // 第一段点数
      mq = L-p+1;                                // 第二段点数
      for(i=0; i<L; i++)                         // 拷贝两段数据
      {
         if(i<p)                                 // 第一段
         {
            mX0[i] = mx[i];
            mY0[i] = my[i];
            if(i==p-1)                           // 第一段的最后一个点也是第二段的起点
            {
               mX1[i-p+1] = mx[i];
               mY1[i-p+1] = my[i];
            }
         } else                                  // 第二段
         {
            mX1[i-p+1] = mx[i];
            mY1[i-p+1] = my[i];
         }
      }
      if(m_LogB)                                 // 如果取对数
      {
         x0 = mX0[0];
         for(i=0;i<mp;i++)                       // 第一段取对数处理
         {
            if(mX0[i] <= 0)
            {
               for(j=i;j<mp;j++)                 // 移掉前面一段的0
               {
                  mX0[j] = mX0[j+1];
                  mY0[j] = mY0[j+1];
               }
               mp--;                             // 点数-1
               i-=1;                             // i减1再增1
               continue;
            }
            mX0[i] = log10(mX0[i]);              // 取对数
         }
         for(i=0;i<mq;i++)                       // 第二段取对数处理
            mX1[i] = log10(mX1[i]);              // 取对数
      }
   } else                                        // 如果没有分段
   {
      for(i=0;i<L;i++)
      {
         if(my[i]==0) break;
         mX0[i] = mx[i];
         mY0[i] = my[i];
      }
      mp = i;                                    // 总共一段的点数
      if(m_LogB)                                 // 如果取对数
      {
         x0 = mX0[0];
         for(i=0;i<mp;i++)                       // 删除前面0的数
         {
            if(mX0[i]<=0)
            {
               for( j=i;j<mp;j++)
               {
                  mX0[j] = mX0[j+1];
                  mY0[j] = mY0[j+1];
               }
               mp--;
               i--;
               continue;
            }
            mX0[i] = log10(mX0[i]);
         }
      }
   }
   // 根据荧光值寻找浓度值
   i = 0;
   if(!m_SubFlag)                                // 如果没有分段
   {
      while(i<mp)                                // 先初略定位所在区间
      {
         xx = mX0[i];
         yy = old_CalcY(a0,6,xx);
         if(yy<mtc)
         {
            i++;
            continue;
         } else break;
      }
      if(mtc<mY0[0]) i = 0;
      if(i>0 && i<mp)                            // 荧光值在方程中点的范围内
      {
         mtx = old_FindY( a0,mX0[i-1],mX0[i],mtc);   // 精确查找浓度值
         if(m_LogB)                              // 取对数
         {
            mtx = pow(10.0,mtx);
            if(mtx<pow(10.0,mX0[0]))
               mtx = pow(10.0,mX0[0]);
         }
      } else if(i>=mp)                           // 荧光值比最大值大
      {
         mtx = mX0[i-1]*1.15;
         if(m_LogB) mtx = pow(10.0,mtx);
      } else if(i==0)                            // 荧光值小于第一个点的荧光值
      {
         if(!m_LogB)
         {
            if(mtc<mY0[0]) return -1.0;
            return 0;
         }
         dy  = mY0[0] - y0;
         ik  = (pow(10.0,mX0[0])-x0)/dy;
         mtx = (mtc-y0)*ik;
         x0  = pow(10.0,mX0[0])/10.0;
         if(x0>mtx) return 0;
         else return mtx;
      }
   } else                                        // 如果分段了
   {
      while (i < mp)                             // 在第一段里面查找
      {
         xx = mX0[i];
         yy = old_CalcY(a0,6,xx);
         if (yy < mtc)
         {
            i++;
            continue;
         } else break;
      }
      if (mtc < mY0[0]) i = 0;
      if (i > 0 && i <= mp-1)                  // 荧光值在第一个方程的点的范围内     mp
      {
         mtx = old_FindY(a0, mX0[i-1], mX0[i], mtc); // 精确查找
         if (m_LogB)
         {
            mtx = pow(10.0, mtx);
            if (mtx < pow(10.0, mX0[0]))
               mtx = pow(10.0, mX0[0]);
         }
      } else if (i > mp-1 )                     // 如果荧光值大于第一个方程的最大点的荧光值 mp
      {
         j = 0;
         while (j < mq)                          // 循环查找荧光值在第二个方程中的范围
         {
            xx = mX1[j];
            yy = old_CalcY(a1,6,xx);
            if (yy< mtc)
            {
               j++;
               continue;
            } else break;
         }
         if (j > 0 && j < mq)
         {
            mtx = old_FindY(a1,mX1[j-1],mX1[j],mtc); // 荧光值在第二个方程点的范围内
            if (m_LogB) mtx = pow(10.0, mtx);
         } else if (j >= mq)                     // 如果荧光值在第二个方程的最大点的荧光值(最后一个点)
         {
            mtx = mX1[j-1]*1.15;
            if(m_LogB) mtx = pow(10.0,mtx);
         } else                                  // 荧光值大于第一个方程的断点，小于第二个方程的断点
         {
            if (m_LogB)
               mtx = pow(10.0, mX0[mp - 1]);
            else
               mtx = mX0[mp - 1];
            return mtx;
         }
      } else if(i==0)                            // 荧光值小于第一个点的荧光值
      {                                          // 取对数用直线拟合
         if(!m_LogB)
         {
            if(mtc<mY0[0]) return -1.0;
            return 0;
         }
         float k,b;
         k = (my[1]-my[0])/mx[1];
         b = my[0];
         mtx = (mtc-b)/k;
         return mtx;
      }
   }
   return mtx;
}


double old_CalcY(double a[],int n,double x)
{
   double y;
   int i ;
   y = a[0];/* + a[1]*x + a[2]*x*x + a[3]*x*x*x +
       a[4]*x*x*x*x + a[5]*x*x*x*x*x +
       a[6]*x*x*x*x*x*x;*/
   if(x!=0)
   {
      for(i=1; i<=n; i++)
         y = y + a[i]*pow(x,i);
   }
   return y;
}


//------------------------------------------------------------------------------
// 根据提供的多项式参数,自变量的区间,查找指定因变量对应的自变量的值,找不到返回0
//------------------------------------------------------------------------------
double old_FindY(double a[],                         // 多项式参数
             double x1,                          // 自变量区间小值
             double x2,                          // 自变量区间大值
             double cy)                          // 因变量y值
{
   double y;
   double cybbb,ybbb;
   double Max,Min;
   char cybuffer[20]={0};
   char ybuffer[20]={0};
   double low  = x1;
   double high = x2;
   double mid  = (low + high) / 2; ;             // 当前查找区间上,下界及中点的初值
   sprintf(cybuffer,"%.8f",cy);
   cybbb=atof(cybuffer);
   Max = old_CalcY(a,6,x2);
   Min = old_CalcY(a,6,x1);
   if (cy > Max||cy < Min) return 0;             // 越界返回0
   while (low <= high)
   {
      mid = (low + high) / 2;                    // 取区间的中间点计算
      y   = old_CalcY(a,6,mid);
      sprintf(ybuffer,"%.8f",y);
      ybbb = atof(ybuffer);
      if(cybbb==ybbb) return mid;
      if(y<cy) low = mid;                        // 继续在R[mid+1..high]中查找
      else high = mid;                           // 继续在R[low..mid-1]中查找
   }
   return 0;
}

// 曲线拟合
void LB_CurveFit(                      //曲线拟合
                POCT_ITEM liCalc,                  // 项目
                int iIndex,                       //子项序号
                double mx[],                     // 返回子项浓度数值组
                double my[],                      //返回子项反应值数值组
                double a0[],                      //返回第一段系数
                double a1[],                     // 返回第二段系数
                int n[])                          //返回两段的次数
{
   unsigned char ucSub, ucLog;
   double dc,dr;
   int bDotNum,bLimit,iSNum,iSect;
   int iFrom, iTo, iDNum, iNo;
 //
  /* bDotNum = liCalc.Curves[0].StdCount;          //标准点个数//11_10
   bLimit  = liCalc.Curves[0].SectLimits[0];        // 第一段多项式次数//11_10
   iSNum   = liCalc.Curves[0].SectPosi;       //分段数//11_10
   ucLog   = liCalc.Curves[0].ConcTrans;              //是否取对数//11_10*/
   bDotNum = liCalc.Curves[iIndex].StdCount;          //标准点个数//11_11
   bLimit  = liCalc.Curves[iIndex].SectLimits[0];        // 第一段多项式次数//11_11 5
   if(liCalc.Curves[iIndex].SectPosi == 0)                      //分段数//11_11 2
    iSNum   =1;
   else
    iSNum   =2;
   ucLog   = 1 ;//liCalc.Curves[iIndex].ConcTrans;             //是否取对数//11_11

   printf("liCalc.Curves[iIndex].SectPosi:%d \n",liCalc.Curves[iIndex].SectPosi) ;
   printf("liCalc.Curves[0].StdCount:%d \n",liCalc.Curves[iIndex].StdCount) ;
   printf("liCalc.Curves[0].SectLimits[0]:%d \n",liCalc.Curves[iIndex].SectLimits[0]) ;
   printf("liCalc.Curves[0].SectLimits[1]:%d \n",liCalc.Curves[iIndex].SectLimits[1]) ;
   printf("iSNum:%d \n",iSNum) ;
   printf("liCalc.Curves[0].ConcTrans:%d \n",liCalc.Curves[iIndex].ConcTrans) ;
//
   memset(a0,0,sizeof(a0));                       //多项式系数清0
   memset(a1,0,sizeof(a1));                       //多项式系数清0
   memset(n,0,sizeof(n));                         //系数清0
//printf("i_here1 \n") ;
   if(bLimit==0)                                 // 自动找最佳结果
   {
      memset(mx,0,sizeof(mx));
      memset(my,0,sizeof(my));
      for(int j=0; j<bDotNum; j++)              //  标准品浓度和反应值
      {
          mx[j] = liCalc.Curves[iIndex].Concs[j];//11_11
          my[j] = liCalc.Curves[iIndex].Resps[j];//11_11
          //printf("  %f-->", mx[j]) ;
          //printf("%f \n",my[j]) ;
      }
      if(iSNum==1) ucSub = 0;                   //  不分段
      else ucSub = 1;                           //  分段
      iSect = liCalc.Curves[iIndex].SectPosi;     // 分段位置//11_11
//printf("i_here2 \n") ;
      old_FitEqu(mx,my,ucSub,ucLog,
             bDotNum,a0,a1,n,
             iSect,NULL,NULL);
//printf("i_here3 \n") ;
   } else                                      ///   固定多项式次数
   {
      for(int j=0; j<iSNum; j++)                //  分段拟合
      {
         bLimit = liCalc.Curves[iIndex].SectLimits[0];    //多项式次数//11_11
         iSect  = liCalc.Curves[iIndex].SectPosi; // 分段值 06 69 ...(16进制)//11_11

         if(j == 0)
         {
             iFrom  = 0;                   //  分段起点 0  6
             iTo    = iSect;                   //  分段终点 6  9
         }
         else
         {
             iFrom = iSect ;
             iTo    = bDotNum - 1;
         }

         if(j>0) iFrom--;                       //  第二分段开始起始位置-1
         iNo    = 0;
         iDNum  = 0;
         memset(mx,0,sizeof(mx));
         memset(my,0,sizeof(my));
//printf("i_here5 \n") ;
         for(int k=iFrom; k < iTo; k++)
         {
             dc = liCalc.Curves[iIndex].Concs[k];//11_11
             dr = liCalc.Curves[iIndex].Resps[k];//11_11
//printf("i_here9 \n") ;
            if(ucLog)                            // 取对数
            {
//printf("i_here10 \n") ;
               if(dc > 0)                           //只有浓度为正数才能取对数
               {
//printf("i_here7 \n") ;
                  mx[iNo] = log10(dc);
//printf("i_here8 \n") ;
                  my[iNo] = dr;
                  iNo++;
                  iDNum++;
               }
            }
            else                                //不取对数
            {
               mx[iNo] = dc;
               my[iNo] = dr;
               iNo++;
               iDNum++;
            }
         }
//printf("i_here11 \n") ;
         if(bLimit>=iDNum) bLimit=iDNum-1;       // 如果次数大于等于点数,矫正次数
         if(j==0)
         {
//printf("i_here6 \n") ;
            old_polyfit(iDNum,mx,my,bLimit,a0);
            n[0] = bLimit;
         } else
         {
 //printf("i_here4 \n") ;
            old_polyfit(iDNum,mx,my,bLimit,a1);
            n[1] = bLimit;
         }
      }
   }
   for(int j=0; j < bDotNum; j++)
   {
       mx[j] = liCalc.Curves[iIndex].Concs[j];//11_11
       my[j] = liCalc.Curves[iIndex].Resps[j];//11_11
   }
}

int old_FitEqu( double mx[],                 // x数组
            double my[],                 // y数组
            bool mSubFlag,               // 0不分段    1分段
            bool mLogFlag,               // 0不取对数  1取对数
            int L,                       // 点的个数
            double a0[],                 // 第一段方程的参数
            double a1[],                 // 第二段方程的参数
            int n[],                     // 输出方程的次数
            int p,                       // 分段点
            double mtc,
            double *mtx)
{
   return old_fitequ(mx,my,mSubFlag,mLogFlag,L,a0,a1,n,p,mtc,mtx);
}


/**************************************************************
函数名称：bool FitEqu(double x[],double y[],double a[],int *n)
描    述：拟合得到方程。
输入参数：x[]取点的x坐标值；y[]取点的y坐标值；
      mSubFlag：是否分段TRUE：是，FALSE：否；
      mLogFlag：是否取对数TRUE:是，FALSE:否；
      p：分段的断点是第几个点。
      L:总点数据
输出参数：n[2]：得到多项式的项数；a0[]：多项式1的参数；
      a1[]：多项式2的参数。
返    回：0：没有找到多项式；1：找到一个多项式；
         2：找到两个多项式（如果mSubFlag为true的时候）
***************************************************************/
int old_fitequ(double mx[],double my[],bool mSubFlag,bool mLogFlag,int L,
    double a0[],double a1[],int n[],int p,double mtc,double *mtx)
{
   int i,j,k=0;
   int m=16;
   double rss=0,Orss = 10;
   int mp,mq;
   double mX0[16],mX1[16];
   double mY0[16],mY1[16];
   double ma0[6][10],ma1[6][10];
   double y0;
   n[0] = 0;
   n[1] = 0;
   for(i=0;i<6;i++)
   {
      for(j=0;j<10;j++)
      {
         ma0[i][j] = 0;
         ma1[i][j] = 0;
      }
   }
   memset(mX0,0,sizeof(mX0));
   memset(mY0,0,sizeof(mX0));
   memset(mX1,0,sizeof(mX0));
   memset(mY1,0,sizeof(mX0));
   if(mSubFlag)   //如果分段
   {
      if(p<3)
         return 0;
      mp = p;
      for(int ii=0;ii<16;ii++)//拷贝两段数据//11_13
      {
         if(ii<p)
         {
            mX0[ii] = mx[ii];
            mY0[ii] = my[ii];
         }
         else
         {
            mX1[ii-p] = mx[ii-1];
            mY1[ii-p] = my[ii-1];
         }
      }
      if(mLogFlag)   //如果取对数
      {
         y0 = mY0[0];
         for(i=0;i<mp;i++)//第一段
         {
            if(mX0[i] <= 0)
            {
               for(int j=i;j<mp;j++)//移掉前面一段的0
               {
                  mX0[j] = mX0[j+1];
                  mY0[j] = mY0[j+1];
               }
               mp--;
               i-=1;//i减1再增1
               continue;
            }
            mX0[i] = log10(mX0[i]);//+0.7;
         }
         for(i=0;i<L-p+1;i++)//第二段
         {
            y0 = mX1[i] = log10(mX1[i]);//+0.7;
         }
         mq = i;
      }
      else
      {
         mq = L-p+1;
      }
   }
   else//如果没有分段
   {
      for(i=0;i<L;i++)
      {
         if(my[i]==0)
            break;
         mX0[i] = mx[i];
         mY0[i] = my[i];
      }
      mp = i;
      if(mLogFlag)   //如果取对数
      {
         y0 = mY0[0];
         for(i=0;i<mp;i++)
         {
            if(mX0[i]<=0)
            {
               for( j=i;j<mp;j++)
               {
                  mX0[j] = mX0[j+1];
                  mY0[j] = mY0[j+1];
               }
               mp--;
               i--;//i减1
               continue;//再增1
            }
            mX0[i] = log10(mX0[i]);//+0.7;
         }
      }
   }
   double x,y1,y2,xx;
   int mcFlag,poly_n = 1;
   int pro = mLogFlag? 1:2/*0*/;
   double low,upp;
   double mup;
   double jjj;
   int ii=0,jj=0;
   int iFlag=0;
   double yyy;
   /***********下面开始拟合方程***********/
   if(!mSubFlag)   //如果没有分段 开始拟合方程
   {
      poly_n = 1;
      iFlag = 0;
      for(i=0;i<6;i++)
      {
         mcFlag = 0;
         if(mp<3)
         {
            i=6;
            break;
         }
         for(int j=0;j<16;j++)
            a0[j] = 0;
         old_polyfit(mp,mX0,mY0,poly_n,a0);//拟合方程1
         low = mX0[0];//修改
         upp = mX0[mp-1]+0.0001;
         if(mLogFlag)
            mup = mX0[mp-1]-0.06;
         else
            mup = mX0[mp-1]*19/20.0;
   /*      yyy = a0[0];
         yyy = a0[1];
         yyy = a0[2];
         yyy = a0[3];
         yyy = a0[4];
   */      for( x=low;x<=upp;)
         {
            y1 = a0[0] + a0[1]*x + a0[2]*x*x + a0[3]*x*x*x + a0[4]*x*x*x*x + a0[5]*x*x*x*x*x + a0[6]*x*x*x*x*x*x;
            if(mLogFlag)
               x =x+0.01;
            else
               x=x+1;
         //   x = x+0.5;
            y2 = a0[0] + a0[1]*x + a0[2]*x*x + a0[3]*x*x*x + a0[4]*x*x*x*x + a0[5]*x*x*x*x*x + a0[6]*x*x*x*x*x*x;
            if(y2<y1)
               break;
         }
         if(x>=mup)//upp)
         {
            for(jj=0;jj<poly_n+1;jj++)
               y1 = ma0[ii][jj] = a0[jj];
            ii++;
         }
         poly_n += 1;
      }
      if(ii==0)
      {
         //MessageBox("没有找到拟合方程");
         for(int j=0;j<16;j++)
            a0[j] = 0;
         return 0;
      }
      int j;
      for(i=0;i<ii;i++)
      {
         rss = 0;
         for(int e=0;e<mp;e++)
         {
            xx = mX0[e];
            y1 = ma0[i][0]+ ma0[i][1]*xx+ma0[i][2]*xx*xx+ma0[i][3]*xx*xx*xx\
               +ma0[i][4]*xx*xx*xx*xx+ma0[i][5]*xx*xx*xx*xx*xx\
               +ma0[i][6]*xx*xx*xx*xx*xx*xx;
            jjj = fabs(mY0[e]-y1);
            rss += jjj*jjj;
         }
         if(Orss>rss)
         {
            Orss = rss;
            rss = 0;
            iFlag = i;
            j=i+1;
            k = 1;
         }
      }
      for(i=0;i<=6;i++)
      {
         a0[i] = ma0[iFlag][i];
         if(a0[i]!=0)
            j = i;
      }
      n[0] = j;
      Orss = 10;
   }//
   else   //有分段的时候
   {
//第一段
      poly_n = 1;
      for(i=0;i<6;i++)
      {
         mcFlag = 0;
         if(mp<3)
         {
            i=6;
            break;
         }
         for(int j=0;j<16;j++)
            a0[j] = 0;
         old_polyfit(mp,mX0,mY0,poly_n,a0);
         low = mX0[0];//-0.05;修改
         upp = mX0[mp-1]+0.01;
         if(mLogFlag)
            mup = mX0[mp-1]-0.06;
         else
            mup = mX0[mp-1]*19/20.0;
         for( x=low;x<upp;)
         {
            y1 = a0[0] + a0[1]*x + a0[2]*x*x + a0[3]*x*x*x + a0[4]*x*x*x*x\
               + a0[5]*x*x*x*x*x + a0[6]*x*x*x*x*x*x;
            if(mLogFlag)
               x = x+0.01;
            else
               x += 1;
            y2 = a0[0] + a0[1]*x + a0[2]*x*x + a0[3]*x*x*x + a0[4]*x*x*x*x\
               + a0[5]*x*x*x*x*x + a0[6]*x*x*x*x*x*x;
            if(y2<y1)
               break;
         }

         if(x>=mup)//upp)
         {
            for(jj=0;jj<poly_n+1;jj++)
               ma0[ii][jj] = a0[jj];
            ii++;
         }
         double myy;
         myy = a0[6];
         poly_n += 1;
      }//end of for(i=0;i<7;i++)
      k = 1;
      if(ii==0)
      {
         //MessageBox("没有找到第一段的拟合方程");
         for(int j=0;j<16;j++)
            a0[j] = 0;
         k= 0;
         poly_n = 0;
      }
      else
      {
         int j;
         iFlag = 0;
         for(i=0;i<ii;i++)
         {
            rss = 0;
            for(int e=0;e<mp;e++)
            {
               xx = mX0[e];
               y1 = ma0[i][0]+ma0[i][1]*xx+ma0[i][2]*xx*xx+ma0[i][3]*xx*xx*xx\
                  +ma0[i][4]*xx*xx*xx*xx+ma0[i][5]*xx*xx*xx*xx*xx\
                  +ma0[i][6]*xx*xx*xx*xx*xx*xx;
               jjj = fabs(mY0[e]-y1);
               rss += jjj*jjj;//残差平方和
            }
            if(Orss>=rss)
            {
               Orss = rss;
               iFlag = i;
         //      j=i+1;
               k=1;
            }
         }
         for( i=0;i<16;i++)
            a0[i] = 0;
         for(i=0;i<=6;i++)
         {
            a0[i] = ma0[iFlag][i];
            if(a0[i]!=0)
               j = i;
         }
         yyy = a0[6];
         n[0] = j;
      }
      ii = 0;
      Orss = 10;
//第二段
      poly_n = 1;
      for(i=0;i<6;i++)
      {
         mcFlag = 0;
         if(mq<3)
         {
            i=6;
            break;
         }
         for(int j=0;j<16;j++)
            a1[j] = 0;
         old_polyfit( mq,mX1,mY1,poly_n,a1);
         low = mX1[0];//-0.05;修改
         upp = mX1[mq-1]+0.01;
   //      mup = mX1[mq-1];
         if(mLogFlag)
            mup = mX1[mq-1]-0.06;
         else
            mup = mX1[mq-1]*19/20.0;
         for( x=low;x<upp;)
         {
            y1 = a1[0] + a1[1]*x + a1[2]*x*x + a1[3]*x*x*x + a1[4]*x*x*x*x\
               + a1[5]*x*x*x*x*x + a1[6]*x*x*x*x*x*x;
            if(mLogFlag)
               x += 0.01;
            else
               x+=1;
            y2 = a1[0] + a1[1]*x + a1[2]*x*x + a1[3]*x*x*x + a1[4]*x*x*x*x\
               + a1[5]*x*x*x*x*x + a1[6]*x*x*x*x*x*x;
            if(y2<y1)
               break;
         }
         if(x>=mup)//upp)
         {
            for(jj=0;jj<poly_n+1;jj++)
               ma1[ii][jj] = a1[jj];
            ii++;
         }
         poly_n += 1;
      }
      if(ii==0)
      {
         //MessageBox("没有找到第二段的拟合方程");
         for(int j=0;j<16;j++)
            a1[j] = 0;
         n[1] = 0;
         return k;
      }
      else
      {
         int j=0;
         iFlag = 0;
         for(i=0;i<ii;i++)
         {
            rss = 0;
            for(int e=0;e<mq;e++)
            {
               xx = mX1[e];
               y1 = ma1[i][0]+ma1[i][1]*xx+ma1[i][2]*xx*xx+ma1[i][3]*xx*xx*xx\
                  +ma1[i][4]*xx*xx*xx*xx+ma1[i][5]*xx*xx*xx*xx*xx\
                  +ma1[i][6]*xx*xx*xx*xx*xx*xx;
               jjj = fabs(mY1[e]-y1);
               rss += jjj*jjj;
            }
            if(Orss>=rss)
            {
               Orss = rss;
               iFlag = i;
               j=i+1;
            }
         }
         for(i=0;i<16;i++)
            a1[i] = 0;
         for(i=0;i<=6;i++)
         {
            a1[i] = ma1[iFlag][i];
            if(a1[i]!=0)
               j = i;
         }
         if(j)
            k++;
         n[1] = j;
         Orss = 10;
      }
   }
   return k;
}

//__declspec(dllexport) __stdcall
void old_PolyFit(int n,
             double x[],
             double y[],
             int poly_n,
             double a[])
{
   old_polyfit(n,x,y,poly_n,a);
}

//==================polyfit(n,x,y,poly_n,a)===================
// 功能: 拟合y=a0+a1*x+a2*x^2+……+apoly_n*x^poly_n
// 参数: x,y    : 数据值
//       n      : 数据个数
//       poly_n : 多项式的项数
// 返回: a0,a1,a2,……a[poly_n]，系数比项数多一(常数项)
void old_polyfit(int n,double x[],double y[],int poly_n,double a[])
{
   int i,j;
   double *tempx,*tempy,*sumxx,*sumxy,*ata;
   tempx=(double*)calloc(n,sizeof(double));
   sumxx=(double*)calloc(poly_n*2+1,sizeof(double));
   tempy=(double*)calloc(n,sizeof(double));
   sumxy=(double*)calloc(poly_n+1,sizeof(double));
   ata=(double*)calloc((poly_n+1)*(poly_n+1),sizeof(double));
   for(i=0;i<n;i++)
   {
      tempx[i]=1;
      tempy[i]=y[i];
   }
   for(i=0;i<2*poly_n+1;i++)
   for(sumxx[i]=0,j=0;j<n;j++)
   {
      sumxx[i]+=tempx[j];
      tempx[j]*=x[j];
   }
   for(i=0;i<poly_n+1;i++)
   for(sumxy[i]=0,j=0;j<n;j++)
   {
      sumxy[i]+=tempy[j];
      tempy[j]*=x[j];
   }
   for(i=0;i<poly_n+1;i++)
   for(j=0;j<poly_n+1;j++)
      ata[i*(poly_n+1)+j]=sumxx[i+j];
   old_gauss_solve(poly_n+1,ata,a,sumxy);
   free(tempx);
   free(sumxx);
   free(tempy);
   free(sumxy);
   free(ata);
}



void old_gauss_solve(int n,double A[],double x[],double b[])
{
   int i,j,k,r;
   double max;
   for (k=0;k<n-1;k++)
   {
      max=fabs(A[k*n+k]); //find maxmum/
      r=k;
      for (i=k+1;i<n-1;i++)
         if (max<fabs(A[i*n+i]))
         {
            max=fabs(A[i*n+i]);
            r=i;
         }
      if (r!=k)
         for (i=0;i<n;i++)         //change array:A[k]&A[r] /
         {
            max=A[k*n+i];
            A[k*n+i]=A[r*n+i];
            A[r*n+i]=max;
         }
      max=b[k];                    //change array:b[k]&b[r]     /
      b[k]=b[r];
      b[r]=max;
      for (i=k+1;i<n;i++)
      {
         for (j=k+1;j<n;j++)
         A[i*n+j]-=A[i*n+k]*A[k*n+j]/A[k*n+k];
         b[i]-=A[i*n+k]*b[k]/A[k*n+k];
      }
   }
   for (i=n-1;i>=0;x[i]/=A[i*n+i],i--)
   for (j=i+1,x[i]=b[i];j<n;j++)
   x[i]-=A[i*n+j]*x[j];
}

