<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

namespace App\Utils;

use Symfony\Component\HttpFoundation\Request;

/**
 * Description of Utils
 *
 * @author bambo
 */
class Utils {

    public static $sender = 'support-med@univ-thies.sn';
    public static $senderName = 'Service Médical UIDT';
    public static $websiteUrl = 'http://localhost:4200/#';
    public static $passwordResetLink = 'http://localhost:4200/#/public/new-password/';
    public static $calendarParams = [
        "01"=>['code'=>'01','month'=>'Janv','endTo'=>31],
        "02"=>['code'=>'02','month'=>'Fév','endTo'=>28],
        "03"=>['code'=>'03','month'=>'Mar','endTo'=>31],
        "04"=>['code'=>'04','month'=>'Avr','endTo'=>30],
        "05"=>['code'=>'05','month'=>'Mai','endTo'=>31],
        "06"=>['code'=>'06','month'=>'Juin','endTo'=>30],
        "07"=>['code'=>'07','month'=>'Juil','endTo'=>31],
        "08"=>['code'=>'08','month'=>'Aout','endTo'=>31],
        "09"=>['code'=>'09','month'=>'Sept','endTo'=>30],
        "10"=>['code'=>'10','month'=>'Oct','endTo'=>31],
        "11"=>['code'=>'11','month'=>'Nov','endTo'=>30],
        "12"=>['code'=>'12','month'=>'Dec','endTo'=>31]
    ];

    public static function serializeRequestContent(Request $request) {
        return json_decode($request->getContent(), true);
    }
    
    public static function getObjectFromRequest(Request $request) {
        return json_decode($request->getContent());
    }

}