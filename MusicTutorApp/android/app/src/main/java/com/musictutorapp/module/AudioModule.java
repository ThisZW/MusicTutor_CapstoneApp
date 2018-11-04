package com.musictutorapp.module;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import java.util.*;

import be.tarsos.dsp.AudioDispatcher;
import be.tarsos.dsp.AudioEvent;
import be.tarsos.dsp.AudioProcessor;

import be.tarsos.dsp.io.android.AudioDispatcherFactory;

import be.tarsos.dsp.pitch.PitchDetectionHandler;
import be.tarsos.dsp.pitch.PitchDetectionResult;
import be.tarsos.dsp.pitch.PitchProcessor;

public class AudioModule extends ReactContextBaseJavaModule
{
    private double frequency;
    
    //constructor
    public AudioModule( ReactApplicationContext reactContext )
    {
        super( reactContext );
        frequency = 0;
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
            function.invoke( frequency );
        }
        catch( Exception e )
        {
            function.invoke( e.toString( ) );
        }
    }
}
