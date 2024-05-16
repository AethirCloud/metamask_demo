/*
 * @Description:
 * @Version: 2.0
 * @Autor: Qiguangxin
 * @Date: 2024-05-06 13:26:51
 * @LastEditors: Qiguangxin
 * @LastEditTime: 2024-05-09 17:08:24
 */
// useSynapsVerification.js
import { useEffect, useState } from 'react';
import { Synaps } from '@synaps-io/verify-sdk';
import { getSessionStatus, initSession } from '@/pages/api/login';
import localforage from 'localforage';
const useSynapsVerification = () => {
  const [sessionId, setSessionId] = useState('');
  const [status, setStatus] = useState('0');
  const [originalMessage, setOriginalMessage] = useState('');
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://api.synaps.io/v4/session/init', {
          method: 'POST',
          headers: {
            'Api-Key': 'rRyBG0vJCI7eybAJddRjVAAOw7MqXEqq',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            alias: 'MY_ALIAS',
          }),
        });

        if (response.ok) {
          const data = await response.json();
          const sessionId = data.session_id;
          setSessionId(sessionId);
        } else {
          console.error('Failed to fetch data');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
    // localforage.setItem('status', 1);
    // setStatus(1);
    updateStatus();
  }, []);
  const updateStatus = () => {
    getSessionStatus().then((res) => {
      console.log('getSessionStatus==', res);
      if (res.code === 135000) {
        setStatus(res?.data?.sessionStatus);
        setOriginalMessage(res?.data?.originalMessage);
        localforage.setItem('status', res?.data?.sessionStatus);
        localforage.setItem('originalMessage', res?.data?.originalMessage);
      }
    });
  };
  useEffect(() => {
    let init = true;

    Synaps.init({
      sessionId: sessionId,
      onFinish: () => {
        initSession({ sessionId: sessionId }).then((res) => {
          if (res.code === 135000) {
            updateStatus();
          }
        });
      },
      mode: 'modal',
    });

    return () => {
      init = false;
    };
  }, [sessionId]);

  const handleOpen = () => {
    Synaps.show();
  };

  return { handleOpen, status, originalMessage };
};

export default useSynapsVerification;
