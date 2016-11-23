var ws1 =  document.getElementById("ws1");
var wp1 = document.getElementById("wp1");
var ds1 =  document.getElementById("ds1");
var dp1 = document.getElementById("dp1");
var b1 = document.getElementById("s1");
var n1 =  document.getElementById("n1");
var w1 = document.getElementById("w1");
var c1 = document.getElementById("c1");

var ws2 =  document.getElementById("ws2");
var wp2 = document.getElementById("wp2");
var ds2 =  document.getElementById("ds2");
var dp2 = document.getElementById("dp2");
var b2 = document.getElementById("s2");
var n2 =  document.getElementById("n2");
var w2 = document.getElementById("w2");
var c2 = document.getElementById("c2");


function linspace(a,b,n) {
    if(typeof n === "undefined") n = Math.max(Math.round(b-a)+1,1);
    if(n<2) { return n===1?[a]:[]; }
    var i,ret = Array(n);
    n--;
    for(i=n;i>=0;i--) { ret[i] = (i*b+(n-i)*a)/n; }
    return ret;
}

b1.onclick = function() {f1()};
b2.onclick = function() {f2()};

function f1(){
	var ws = ws1.value;
	var wp = wp1.value;
	var ds = ds1.value;
	var dp = dp1.value;

	var as = math.pow(10, (ds/20));
	var ap = math.pow(10, (dp/20));
	//e=sqrt((1/Ap^2)-1);

	// var e = math.sqrt( (1/(math.pow(ap, 2))) - 1 )

	//N=log10(sqrt((1/As^2-1)/(1/Ap^2-1)));

	var n = math.log10( math.sqrt( (1/(math.pow(as, 2)-1))/(1/(math.pow(ap, 2)-1) ) ) ) / math.log10(ws/wp);
	window.alert(n);
	n = math.ceil(n);

	//Wc=Wp/(1/Ap^2-1)^(1/(2*N));

	var wc = wp/(  math.pow(1/(math.pow(ap, 2)-1), 1/(2*n) ) );

	w = linspace(0, 1.5*ws, 2000);
	hs = []
	for(var i in w){
		//Hs=sqrt(1./(1+(W/Wc).^(2*N)));

		hs.push(math.sqrt(1/(1+math.pow(i/wc, 2*n))))
	}
	n1.innerHTML = "Order of the butterworth filter: " + n;
	w1.innerHTML = "Value of 3dB cut off frequency: " + wc;
	var trace1 = {
			
			x: w,
			y: hs,
  			mode: 'markers',
  			type: 'bar',};
		var layout = {
	  		title: 'x[n] sequence',
	  		xaxis: {
		    	title: 'n',
		    	// range: [-N, 2*N],
		    	titlefont: {	
		      		family: 'Courier New, monospace',
		      		size: 18,
		      		color: '#7f7f7f'
	    		}
	  		},
	  		yaxis: {
	    		title: 'x[n]',
	    		titlefont: {
	      			family: 'Courier New, monospace',
	      			size: 18,
	      			color: '#7f7f7f'
	    		}
	  		}};

	  		var data = [trace1];
			c1.style.display = 'block';
			Plotly.newPlot('c1', data, layout);

// 	disp('Order of the butterworth filter: ');
// disp(N);
// disp('Value of 3dB cut off frequency: ');
// disp(Wc);
// plot(W,Hs);
}


function f2(){

	var ws = ws2.value;
	var wp = wp2.value;
	var ds = ds2.value;
	var dp = dp2.value;

	var as = math.pow(10, -(ds/20));
	var ap = math.pow(10, -(dp/20));
	console.log(ap)
	var e = math.sqrt( (1/(math.pow(ap, 2))) - 1 )
	console.log(e)
	var n = math.acosh( math.sqrt( (1/(math.pow(as, 2)-1))/(1/(math.pow(ap, 2)-1) ) ) ) / math.acosh(ws/wp);
	n = math.ceil(n)+1;

	//var y =1/2*(math.pow((math.sqrt(1+1/math.pow(e, 2))+1/e), (1/n))-math.pow((math.sqrt(1+1/math.pow(e, 2))+1/e), (-1/n)));

	//N=acosh(sqrt((1/As^2-1)/(1/Ap^2-1)))/acosh(Ws/Wp);
	
	w=linspace(0,1.5*ws,2000);

	h = []

	for(var i in w){
		x = i/wp;
		var temp = 0
		if(math.abs(x) < 1){
			temp = math.cos(n*math.acos(x));
		}
		else{
			temp = math.cosh(n*math.acosh(x));
		}
		// console.log(math.pow(e*temp, 2))
		h.push(   1/(math.sqrt(1+ (math.pow(e*temp, 2) ) ))  );
	}

	window.alert(w);
	n2.innerHTML = "Order of the butterworth filter: " + n;
	// w1.innerHTML = "Value of 3dB cut off frequency: " + wc;
	var trace2 = {
			
			x: w,
			y: h,
  			mode: 'markers',
  			type: 'bar',};
		var layout = {
	  		title: 'x[n] sequence',
	  		xaxis: {
		    	title: 'n',
		    	// range: [-N, 2*N],
		    	titlefont: {	
		      		family: 'Courier New, monospace',
		      		size: 18,
		      		color: '#7f7f7f'
	    		}
	  		},
	  		yaxis: {
	    		title: 'x[n]',
	    		titlefont: {
	      			family: 'Courier New, monospace',
	      			size: 18,
	      			color: '#7f7f7f'
	    		}
	  		}};

	  		var data = [trace2];
			c2.style.display = 'block';
			Plotly.newPlot('c2', data, layout);
}