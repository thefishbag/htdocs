<?php
	function http_request($url,$pars=""){

        $ch = curl_init();
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($ch, CURLOPT_POST, 1 );
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_TIMEOUT, 5);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $pars);
   
        $data = curl_exec($ch);
 

        if ($data == false) {
            curl_close($ch);
        }
        @curl_close($ch);
        return $data;
	}
	function getAESign($appKey,$appSecret,$pars){

	    $sign_str = "";
	    	
	
	    $code_arr = array(
	        'client_id' => $appKey
	    );
	    foreach ($pars as $key=>$val){
	    	$code_arr[$key] = $val;
	    }
	    //print_r($code_arr);
	    ksort($code_arr);
	    foreach ($code_arr as $key=>$val)
	        $sign_str .= $key . $val;
	    $code_sign = strtoupper(bin2hex(hash_hmac("sha1", $sign_str, $appSecret, true)));
	    return $code_sign;
	}
?>