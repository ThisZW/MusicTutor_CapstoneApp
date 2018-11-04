package com.musictutorapp.module;

import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.JavaScriptModule;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.uimanager.ViewManager;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class AudioPackage implements ReactPackage
{
    
    @Override
    public List<ViewManager> createViewManagers(ReactApplicationContext reactContext)
    {
        return Collections.emptyList();
    }
    
    @Override
    public List<NativeModule> createNativeModules(ReactApplicationContext reactContext)
    {
        List<NativeModule> modules = new ArrayList<>();
        
        //We import the module file here
        modules.add( new AudioModule( reactContext ) );
        
        return modules;
    }
    
    // Backward compatibility
    public List<Class<? extends JavaScriptModule>> createJSModules()
    {
        return new ArrayList<>();
    }
}
