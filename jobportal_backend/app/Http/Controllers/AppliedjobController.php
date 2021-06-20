<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Appliedjob;

class AppliedjobController extends Controller
{
    //
    function addAppliedjob(Request $req){
        $appliedjob = new AppliedJob;
        $appliedjob->cid=$req->input('cid');
        $appliedjob->jobid=$req->input('jobid');
        $appliedjob->status=$req->input('status');
        $appliedjob->recruiter=$req->input('recruiter');
        $appliedjob->user=$req->input('user');
        $appliedjob->profile=$req->input('profile');
        $appliedjob->company=$req->input('company');
        $appliedjob->seen=$req->input('seen');
        $appliedjob->save();
        return $appliedjob;
    }

    function getAppliedjob($cid){
        return AppliedJob::where('cid',$cid)->get();
    }

    function getAppliedjobs($user){
        return AppliedJob::where('user',$user)->get();
    }

    function updateStatus($cid, Request $req){
        return AppliedJob::where('cid',$cid)->update(array('status' => $req->input('status'), 'seen' => 1));
    }

    function getCandidates($recruiter){
        return AppliedJob::where('recruiter',$recruiter)->get();
    }
}
