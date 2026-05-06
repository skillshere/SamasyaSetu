import React from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { authDataContext } from '../../context/authContext';
import { useContext } from 'react';
import { userDataContext } from '../../context/userContext';
import { useNavigate } from 'react-router-dom';

const Details = () => {
    const { issueid } = useParams();
    const { userData } = useContext(userDataContext);
    const navigate = useNavigate();
    const [issueDetails, setIssueDetails] = useState(null);
    const { serverUrl } = useContext(authDataContext);
    useEffect(() => {
        if (!userData) {
            navigate('/login');
            return;
        }
        fetchIssueDetails();
    }, [userData]);
    const fetchIssueDetails = async () => {
        try {
            const res = await axios.get(serverUrl + `/api/issue/details/${issueid}`, {
                withCredentials: true
            });
            setIssueDetails(res.data);
            console.log("Issue Details:", res.data);
        } catch (error) {
            console.log(error);
        }
    }

  return (
    <div>
        <div className='w-full min-h-[calc(100vh-64px)] bg-[oklch(95%_0.052_163.051)] px-10'>
            <div className='w-full py-4'>
                <h1 className='text-3xl font-bold text-[oklch(37.3%_0.034_259.733)] mb-6 text-center '>Issue Details</h1>
                {issueDetails ? (
                    <div className='bg-zinc-800 p-6 rounded-lg text-white'>
                        <p className='mb-2'><strong>Title:</strong> {issueDetails.title}</p>
                        <p className='mb-2'><strong>Description:</strong> {issueDetails.description}</p>
                        <p className='mb-2'><strong>Address:</strong> {issueDetails.address}</p>
                        <p className='mb-2'><strong>Location:</strong> {issueDetails.city}, {issueDetails.state}</p>
                        <p className='mb-2'><strong>Reported By : </strong>  {issueDetails.userId.username}  <br />Email : {issueDetails.userId.email}</p>
                    </div>
                ) : (
                    <p className='text-zinc-400'>Loading issue details...</p>
                )}
            </div>

        </div>

    </div>
  )
}

export default Details