package com.musictutorapp.module;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import java.util.*;

public class AudioModule extends ReactContextBaseJavaModule
{
    private double variable;
    
    //constructor
    public AudioModule( ReactApplicationContext reactContext )
    {
        super( reactContext );
        variable = 0.0000001;
    }
    
    //Mandatory function getName that specifies the module name
    @Override
    public String getName( )
    {
        return "Audio";
    }
    
    //Custom function that we are going to export to JS
    @ReactMethod
    public void takeSampleFreq( Callback function )
    {
        try
        {
            function.invoke( variable );
        }
        catch( Exception e )
        {
            function.invoke( e.toString( ) );
        }
    }
}
