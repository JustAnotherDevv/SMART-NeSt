/* Generated by Nim Compiler v1.0.11 */
/*   (c) 2019 Andreas Rumpf */
/* The generated code is subject to the original license. */
#define NIM_INTBITS 32

#include "nimbase.h"
#undef LANGUAGE_C
#undef MIPSEB
#undef MIPSEL
#undef PPC
#undef R3000
#undef R4000
#undef i386
#undef linux
#undef mips
#undef near
#undef far
#undef powerpc
#undef unix
#define nimfr_(x, y)
#define nimln_(x, y)
typedef NU8 tyEnum_FloatClass__pPga1yW9b8J9cwNnm9b1aPRnA;
N_LIB_PRIVATE N_NIMCALL(tyEnum_FloatClass__pPga1yW9b8J9cwNnm9b1aPRnA, classify__x3IKzrz1VNvfZbypScSTXg)(NF x) {	tyEnum_FloatClass__pPga1yW9b8J9cwNnm9b1aPRnA result;
{	result = (tyEnum_FloatClass__pPga1yW9b8J9cwNnm9b1aPRnA)0;
	{
		if (!(x == 0.0)) goto LA3_;
		{
			if (!(((NF)(1.0000000000000000e+000) / (NF)(x)) == INF)) goto LA7_;
			result = ((tyEnum_FloatClass__pPga1yW9b8J9cwNnm9b1aPRnA) 2);
			goto BeforeRet_;
		}
		goto LA5_;
		LA7_: ;
		{
			result = ((tyEnum_FloatClass__pPga1yW9b8J9cwNnm9b1aPRnA) 3);
			goto BeforeRet_;
		}
		LA5_: ;
	}
	LA3_: ;
	{
		if (!(((NF)(x) * (NF)(5.0000000000000000e-001)) == x)) goto LA12_;
		{
			if (!(0.0 < x)) goto LA16_;
			result = ((tyEnum_FloatClass__pPga1yW9b8J9cwNnm9b1aPRnA) 5);
			goto BeforeRet_;
		}
		goto LA14_;
		LA16_: ;
		{
			result = ((tyEnum_FloatClass__pPga1yW9b8J9cwNnm9b1aPRnA) 6);
			goto BeforeRet_;
		}
		LA14_: ;
	}
	LA12_: ;
	{
		if (!!((x == x))) goto LA21_;
		result = ((tyEnum_FloatClass__pPga1yW9b8J9cwNnm9b1aPRnA) 4);
		goto BeforeRet_;
	}
	LA21_: ;
	result = ((tyEnum_FloatClass__pPga1yW9b8J9cwNnm9b1aPRnA) 0);
	goto BeforeRet_;
	}BeforeRet_: ;
	return result;
}
N_LIB_PRIVATE N_NIMCALL(NI64, floorDiv__AhJW2V9aOggsJyHuT9bgq9bug)(NI64 x, NI64 y) {	NI64 result;
	NI64 r;
	result = (NI64)0;
	result = (NI64)(x / y);
	r = (NI64)(x % y);
	{
		NIM_BOOL T3_;
		NIM_BOOL T4_;
		NIM_BOOL T7_;
		T3_ = (NIM_BOOL)0;
		T4_ = (NIM_BOOL)0;
		T4_ = (IL64(0) < r);
		if (!(T4_)) goto LA5_;
		T4_ = (y < IL64(0));
		LA5_: ;
		T3_ = T4_;
		if (T3_) goto LA6_;
		T7_ = (NIM_BOOL)0;
		T7_ = (r < IL64(0));
		if (!(T7_)) goto LA8_;
		T7_ = (IL64(0) < y);
		LA8_: ;
		T3_ = T7_;
		LA6_: ;
		if (!T3_) goto LA9_;
		result -= ((NI) 1);
	}
	LA9_: ;
	return result;
}
N_LIB_PRIVATE N_NIMCALL(NI64, floorMod__AhJW2V9aOggsJyHuT9bgq9bug_2)(NI64 x, NI64 y) {	NI64 result;
	result = (NI64)0;
	result = (NI64)(x % y);
	{
		NIM_BOOL T3_;
		NIM_BOOL T4_;
		NIM_BOOL T7_;
		T3_ = (NIM_BOOL)0;
		T4_ = (NIM_BOOL)0;
		T4_ = (IL64(0) < result);
		if (!(T4_)) goto LA5_;
		T4_ = (y < IL64(0));
		LA5_: ;
		T3_ = T4_;
		if (T3_) goto LA6_;
		T7_ = (NIM_BOOL)0;
		T7_ = (result < IL64(0));
		if (!(T7_)) goto LA8_;
		T7_ = (IL64(0) < y);
		LA8_: ;
		T3_ = T7_;
		LA6_: ;
		if (!T3_) goto LA9_;
		result += y;
	}
	LA9_: ;
	return result;
}
N_LIB_PRIVATE N_NIMCALL(NIM_BOOL, isPowerOfTwo__1xdTQapFveM9bImKot7h9cdw)(NI x) {	NIM_BOOL result;
	NIM_BOOL T1_;
{	result = (NIM_BOOL)0;
	T1_ = (NIM_BOOL)0;
	T1_ = (((NI) 0) < x);
	if (!(T1_)) goto LA2_;
	T1_ = ((NI)(x & (NI)(x - ((NI) 1))) == ((NI) 0));
	LA2_: ;
	result = T1_;
	goto BeforeRet_;
	}BeforeRet_: ;
	return result;
}
N_LIB_PRIVATE N_NIMCALL(NI, nextPowerOfTwo__v2qC0V55wqa9bmqc7eHTz8A)(NI x) {	NI result;
	result = (NI)0;
	result = (NI)(x - ((NI) 1));
	result = (NI)(result | (NI)((NI32)(result) >> (NU32)(((NI) 16))));
	result = (NI)(result | (NI)((NI32)(result) >> (NU32)(((NI) 8))));
	result = (NI)(result | (NI)((NI32)(result) >> (NU32)(((NI) 4))));
	result = (NI)(result | (NI)((NI32)(result) >> (NU32)(((NI) 2))));
	result = (NI)(result | (NI)((NI32)(result) >> (NU32)(((NI) 1))));
	result += (NI)(((NI) 1) + (x <= ((NI) 0)));
	return result;
}