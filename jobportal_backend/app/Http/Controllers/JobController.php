<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Job;

class JobController extends Controller
{
    //
    function addJob(Request $req){
        $job = new Job;
        $job->profile=$req->input('profile');
        $job->company=$req->input('company');
        $job->description=$req->input('description');
        $job->ctc=$req->input('ctc');
        $job->user=$req->input('user');
        $job->jobtype = $req->input('jobtype');
        $job->save();
        return $job;
    }

    function list(){
        return Job::orderBy('id', 'DESC')->get();
    }

    function listbyid($id){
        return Job::where('id',$id)->get();
    }

    function searchbycomp($key){
        return Job::where('company', 'LIKE', "%$key%")->get();
    }

    function searchbyjobtype($key){
        return Job::where('jobtype', 'LIKE', "%$key%")->get();
    }

}
