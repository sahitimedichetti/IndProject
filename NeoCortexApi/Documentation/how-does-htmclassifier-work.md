## HtmClassifier
The HtmClassifier is a helper module that is used to help the process of the next element in the process of learning sequences.
The classifier provides two methods:

Learn(string key, int[] sdr)

String Predict(int[] predictiveCells)

The method learn receives the key string, that represents the sequence and memorizes the SDR for the given key.
Assume, we learn following sequence: 
~~~
1-2-3-4-5-3-5
~~~

In every cycle, the experiment creates the key that represents the sequence in that cycle. For example, the key might look like:

Cycle 1: '1-2-3-4-5-3-5' , 
Cycle 2: '2-3-4-5-3-5-1', 
Cycle 3: '3-4-5-3-5-1-2', 
etc..

During the learning process, the input in every cycle is SDR of cells produced by Temporal Memory algorithm. Because the same SP output (column SDR) for some element (i.e.: ‘3’) will be represented in TM by a different set of cells inside of the same column set. SP generates always (if stable) the same set of active columns for the same element. However, TM does not generate the same set of active cells for the same element. The TM is trying to build the context of the element.
That means ‘3’ followed by ‘2’ produces a different set of active cells than ‘3’ followed by ‘5’. This is why the classifier gets the key in the form shown above. However, developers are free to build a key some other way.

The following shows the trace output of the learning process.

~~~
Col  SDR: 3, 451, 515, 532, 534, 972, 976, 979, 981, 984, 986, 997, 1005, 1013, 1014, 1015, 1019, 1020, 1021, 1022, 
Cell SDR: *94, 11287, 12895, 13312, 13370, 24302, 24402, 24479, 24542, 24609, 24666, 24925, 25132, 25342, 25354, 25375, 25477, 25513, 25526, 25560,*
Missmatch! Actual value: 14-5-7-6-9-3-4-3-4-3-4-0-1-0-2-3-4-5-6-5-4-3-7-1-9-12-11-12-13-14-11-12 - Predicted value: 
Item length: 16	 Items: 34
Predictive cells: 16 	 530, 855, 1213, 1228, 1339, 1988, 2318, 2925, 13843, 14641, 14961, 15043, 15322, 24538, 24932, 25268, 
<indx:0	inp/len: -1.0-0-1-0-2-3-4-5-6-5-4-3-7-1-9-12-11-12-13-14-11-12-14-5-7-6-9-3-4-3-4/20 = similarity 0	 2475, 3145, 3164, 3351, 3674, 3887, 3935, 4329, 14118, 15078, 15514, 15746, 16174, 16329, 16426, 16704, 16837, 17311, 17368, 17429, 
<indx:1	inp/len: -1.0-0-1-0-2-3-4-5-6-5-4-3-7-1-9-12-11-12-13-14-11-12-14-5-7-6-9-3-4-3-4-3/20 = similarity 0	 2378, 2490, 2584, 3079, 3106, 3137, 3158, 3230, 3363, 3838, 13649, 13960, 14122, 14249, 14288, 14992, 15098, 15587, 16344, 16543, 
<indx:2	inp/len: 0-1-0-2-3-4-5-6-5-4-3-7-1-9-12-11-12-13-14-11-12-14-5-7-6-9-3-4-3-4-3-4/40 = similarity 0	 2475, 2495, 3145, 3148, 3152, 3164, 3351, 3372, 3663, 3674, 3887, 3894, 3935, 3937, 4328, 4329, 14101, 14118, 15078, 15086, 15514, 15520, 15742, 15746, 16156, 16174, 16329, 16336, 16426, 16449, 16704, 16708, 16837, 16838, 17300, 17311, 17366, 17368, 17429, 17445, 
<indx:3	inp/len: 1-0-2-3-4-5-6-5-4-3-7-1-9-12-11-12-13-14-11-12-14-5-7-6-9-3-4-3-4-3-4-0/20 = similarity 0	 10403, 10499, 10671, 10920, 11028, 11481, 12200, 12475, 12544, 12762, 13030, 13121, 13273, 13463, 22984, 23277, 23979, 24388, 24733, 25288, 
<indx:4	inp/len: 0-2-3-4-5-6-5-4-3-7-1-9-12-11-12-13-14-11-12-14-5-7-6-9-3-4-3-4-3-4-0-1/20 = similarity 0	 445, 10487, 11026, 11478, 11562, 11627, 12009, 12064, 12214, 12500, 12528, 13032, 13110, 13264, 13464, 13617, 13898, 13940, 14319, 25576, 
<indx:5	inp/len: 2-3-4-5-6-5-4-3-7-1-9-12-11-12-13-14-11-12-14-5-7-6-9-3-4-3-4-3-4-0-1-0/20 = similarity 0	 10401, 10492, 10661, 10924, 11047, 11478, 12220, 12484, 12542, 12752, 13027, 13107, 13260, 13453, 22987, 23281, 23983, 24380, 24734, 25279, 
<indx:6	inp/len: 3-4-5-6-5-4-3-7-1-9-12-11-12-13-14-11-12-14-5-7-6-9-3-4-3-4-3-4-0-1-0-2/20 = similarity 0	 445, 2102, 2683, 11478, 11562, 12812, 13617, 13629, 13807, 13898, 14243, 14280, 14512, 14586, 14944, 15131, 15168, 15203, 15282, 15578, 
<indx:7	inp/len: 4-5-6-5-4-3-7-1-9-12-11-12-13-14-11-12-14-5-7-6-9-3-4-3-4-3-4-0-1-0-2-3/20 = similarity 0	 2384, 2479, 2586, 3081, 3118, 3139, 3173, 3231, 3371, 3836, 13641, 13952, 14114, 14233, 14289, 14999, 15093, 15576, 16341, 16538, 
<indx:8	inp/len: 5-6-5-4-3-7-1-9-12-11-12-13-14-11-12-14-5-7-6-9-3-4-3-4-3-4-0-1-0-2-3-4/20 = similarity 0	 2475, 3145, 3164, 3351, 3674, 3887, 3935, 4329, 14118, 15078, 15514, 15746, 16174, 16329, 16426, 16704, 16837, 17311, 17368, 17429, 
<indx:9	inp/len: 6-5-4-3-7-1-9-12-11-12-13-14-11-12-14-5-7-6-9-3-4-3-4-3-4-0-1-0-2-3-4-5/20 = similarity 0	 5010, 5214, 16405, 16590, 16781, 16832, 16933, 17202, 17440, 17466, 17556, 17700, 17790, 17815, 17973, 18045, 18249, 18352, 18396, 18486, 
<indx:10	inp/len: 5-4-3-7-1-9-12-11-12-13-14-11-12-14-5-7-6-9-3-4-3-4-3-4-0-1-0-2-3-4-5-6/20 = similarity 0	 17201, 17449, 17721, 17817, 18243, 18296, 18354, 18423, 18828, 18948, 19043, 19271, 19324, 19388, 19529, 19568, 19598, 19679, 19794, 19854, 
<indx:11	inp/len: 4-3-7-1-9-12-11-12-13-14-11-12-14-5-7-6-9-3-4-3-4-3-4-0-1-0-2-3-4-5-6-5/20 = similarity 0	 5015, 5224, 16415, 16587, 16777, 16849, 16946, 17218, 17438, 17474, 17555, 17720, 17791, 17801, 17968, 18028, 18226, 18374, 18389, 18480, 
<indx:12	inp/len: 3-7-1-9-12-11-12-13-14-11-12-14-5-7-6-9-3-4-3-4-3-4-0-1-0-2-3-4-5-6-5-4/20 = similarity 0	 2478, 3127, 3162, 3370, 3652, 3890, 3932, 4337, 14119, 15089, 15517, 15741, 16169, 16342, 16443, 16705, 16835, 17315, 17352, 17435, 
<indx:13	inp/len: 7-1-9-12-11-12-13-14-11-12-14-5-7-6-9-3-4-3-4-3-4-0-1-0-2-3-4-5-6-5-4-3/40 = similarity 0	 2378, 2386, 2482, 2490, 2583, 2584, 3079, 3093, 3106, 3113, 3137, 3140, 3158, 3166, 3230, 3237, 3363, 3365, 3837, 3838, 13628, 13649, 13957, 13960, 14115, 14122, 14227, 14249, 14288, 14298, 14992, 14998, 15082, 15098, 15587, 15596, 16325, 16344, 16534, 16543, 
<indx:14	inp/len: 1-9-12-11-12-13-14-11-12-14-5-7-6-9-3-4-3-4-3-4-0-1-0-2-3-4-5-6-5-4-3-7/20 = similarity 0	 6936, 7061, 18236, 18367, 18542, 18587, 18803, 18949, 18950, 19026, 19310, 19537, 19551, 19692, 19782, 20058, 20179, 20332, 20452, 20853, 
<indx:15	inp/len: 9-12-11-12-13-14-11-12-14-5-7-6-9-3-4-3-4-3-4-0-1-0-2-3-4-5-6-5-4-3-7-1/20 = similarity 0	 435, 10480, 11027, 11498, 11568, 11643, 12021, 12074, 12223, 12512, 12532, 13044, 13120, 13274, 13455, 13613, 13892, 13949, 14303, 25577, 
<indx:16	inp/len: 12-11-12-13-14-11-12-14-5-7-6-9-3-4-3-4-3-4-0-1-0-2-3-4-5-6-5-4-3-7-1-9/20 = similarity 0	 9485, 9518, 9616, 9648, 20404, 20803, 20944, 21044, 21122, 21469, 21531, 21737, 21910, 22232, 22387, 22445, 22540, 22603, 22642, 22896, 
<indx:17	inp/len: 11-12-13-14-11-12-14-5-7-6-9-3-4-3-4-3-4-0-1-0-2-3-4-5-6-5-4-3-7-1-9-12/20 = similarity 0	 92, 11281, 12884, 13310, 13361, 24303, 24400, 24489, 24541, 24612, 24654, 24947, 25139, 25349, 25364, 25387, 25476, 25522, 25535, 25574, 
>indx:18	inp/len: 12-13-14-11-12-14-5-7-6-9-3-4-3-4-3-4-0-1-0-2-3-4-5-6-5-4-3-7-1-9-12-11/20 = similarity 2	 11532, 11734, 11998, 21032, 22607, 22790, 22888, 23081, 23120, 23361, 23554, 23939, 24011, 24258, 24418, 24486, 24538, 24620, 24673, 24932, 
<indx:19	inp/len: 13-14-11-12-14-5-7-6-9-3-4-3-4-3-4-0-1-0-2-3-4-5-6-5-4-3-7-1-9-12-11-12/20 = similarity 0	 91, 11296, 12875, 13311, 13354, 24322, 24405, 24480, 24544, 24606, 24656, 24935, 25148, 25343, 25352, 25391, 25496, 25521, 25541, 25572, 
<indx:20	inp/len: 14-11-12-14-5-7-6-9-3-4-3-4-3-4-0-1-0-2-3-4-5-6-5-4-3-7-1-9-12-11-12-13/20 = similarity 0	 890, 1063, 1153, 12869, 12893, 13142, 13364, 13748, 13767, 13911, 24159, 24539, 24948, 25125, 25335, 25365, 25479, 25505, 25527, 25571, 
*** >indx:21	inp/len: 11-12-14-5-7-6-9-3-4-3-4-3-4-0-1-0-2-3-4-5-6-5-4-3-7-1-9-12-11-12-13-14/20 = similarity 14	 530, 855, 1063, 1153, 1213, 1228, 1339, 1988, 2318, 2925, 13843, 14049, 14188, 14641, 14961, 15043, 15322, 25268, 25365, 25571, 
<indx:22	inp/len: 12-14-5-7-6-9-3-4-3-4-3-4-0-1-0-2-3-4-5-6-5-4-3-7-1-9-12-11-12-13-14-11/20 = similarity 0	 11535, 11748, 11987, 21046, 22622, 22784, 22882, 23088, 23109, 23355, 23565, 23930, 24007, 24262, 24409, 24490, 24526, 24619, 24664, 24936, 
<indx:23	inp/len: 14-5-7-6-9-3-4-3-4-3-4-0-1-0-2-3-4-5-6-5-4-3-7-1-9-12-11-12-13-14-11-12/20 = similarity 0	 *94, 11287, 12895, 13312, 13370, 24302, 24402, 24479, 24542, 24609, 24666, 24925, 25132, 25342, 25354, 25375, 25477, 25513, 25526, 25560,* 
*** <indx:24	inp/len:>5-7-6-9-3-4-3-4-3-4-0-1-0-2-3-4-5-6-5-4-3-7-1-9-12-11-12-13-14-11-12-14/20 = similarity 14	 530, 855, 1063, 1153, 1213, 1228, 1339, 1988, 2318, 2925, 13843, 14037, 14191, 14641, 14961, 15043, 15322, 25268, 25365, 25571, 
<indx:25	inp/len: 7-6-9-3-4-3-4-3-4-0-1-0-2-3-4-5-6-5-4-3-7-1-9-12-11-12-13-14-11-12-14-5/20 = similarity 0	 5017, 5209, 16420, 16596, 16789, 16843, 16943, 17217, 17439, 17467, 17574, 17724, 17798, 17803, 17958, 18026, 18232, 18357, 18387, 18490, 
<indx:26	inp/len: 6-9-3-4-3-4-3-4-0-1-0-2-3-4-5-6-5-4-3-7-1-9-12-11-12-13-14-11-12-14-5-7/20 = similarity 0	 6933, 7062, 18237, 18364, 18533, 18589, 18824, 18932, 18965, 19048, 19317, 19540, 19570, 19699, 19780, 20055, 20178, 20325, 20455, 20867, 
<indx:27	inp/len: 9-3-4-3-4-3-4-0-1-0-2-3-4-5-6-5-4-3-7-1-9-12-11-12-13-14-11-12-14-5-7-6/20 = similarity 0	 17218, 17438, 17720, 17801, 18226, 18291, 18374, 18408, 18834, 18925, 19049, 19266, 19323, 19378, 19536, 19557, 19588, 19696, 19781, 19863, 
<indx:28	inp/len: 3-4-3-4-3-4-0-1-0-2-3-4-5-6-5-4-3-7-1-9-12-11-12-13-14-11-12-14-5-7-6-9/20 = similarity 0	 9497, 9506, 9620, 9633, 20423, 20806, 20949, 21045, 21104, 21450, 21526, 21734, 21909, 22246, 22389, 22442, 22526, 22613, 22636, 22876, 
<indx:29	inp/len: 4-3-4-3-4-0-1-0-2-3-4-5-6-5-4-3-7-1-9-12-11-12-13-14-11-12-14-5-7-6-9-3/20 = similarity 0	 2388, 2483, 2585, 3087, 3122, 3141, 3169, 3243, 3352, 3828, 13648, 13973, 14123, 14231, 14281, 14987, 15090, 15589, 16335, 16530, 
<indx:30	inp/len: 3-4-3-4-0-1-0-2-3-4-5-6-5-4-3-7-1-9-12-11-12-13-14-11-12-14-5-7-6-9-3-4/20 = similarity 0	 2489, 3131, 3170, 3358, 3669, 3896, 3927, 4332, 14104, 15075, 15501, 15745, 16167, 16327, 16446, 16715, 16826, 17307, 17350, 17446, 
<indx:31	inp/len: 4-3-4-0-1-0-2-3-4-5-6-5-4-3-7-1-9-12-11-12-13-14-11-12-14-5-7-6-9-3-4-3/40 = similarity 0	 2378, 2386, 2482, 2490, 2583, 2584, 3079, 3093, 3106, 3113, 3137, 3140, 3158, 3166, 3230, 3237, 3363, 3365, 3837, 3838, 13628, 13649, 13957, 13960, 14115, 14122, 14227, 14249, 14288, 14298, 14992, 14998, 15082, 15098, 15587, 15596, 16325, 16344, 16534, 16543, 
<indx:32	inp/len: 3-4-0-1-0-2-3-4-5-6-5-4-3-7-1-9-12-11-12-13-14-11-12-14-5-7-6-9-3-4-3-4/20 = similarity 0	 2495, 3148, 3152, 3372, 3663, 3894, 3937, 4328, 14101, 15086, 15520, 15742, 16156, 16336, 16449, 16708, 16838, 17300, 17366, 17445, 
<indx:33	inp/len: 4-0-1-0-2-3-4-5-6-5-4-3-7-1-9-12-11-12-13-14-11-12-14-5-7-6-9-3-4-3-4-3/20 = similarity 0	 2376, 2496, 2595, 3084, 3103, 3146, 3161, 3242, 3374, 3849, 13630, 13972, 14112, 14247, 14290, 14997, 15081, 15593, 16340, 16531, 
Current Input: 12 	| Predicted Input: *11-12-14-5-7-6-9-3-4-3-4-3-4-0-1-0-2-3-4-5-6-5-4-3-7-1-9-12-11-12-13-14*

-------------- 14 --------------- NEXT CYCLE
PPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPP
Active segments: 40, Matching segments: 40
Col  SDR: 21, 34, 42, 46, 48, 49, 53, 79, 92, 117, 553, 561, 567, 585, 598, 601, 612, 1010, 1014, 1022, 
Cell SDR: 530, 855, 1063, 1153, 1213, 1228, 1339, 1988, 2318, 2925, 13843, 14037, 14191, 14641, 14961, 15043, 15322, 25268, 25365, 25571, 
Missmatch! Actual value: 5-7-6-9-3-4-3-4-3-4-0-1-0-2-3-4-5-6-5-4-3-7-1-9-12-11-12-13-14-11-12-14 - Predicted value: 11-12-14-5-7-6-9-3-4-3-4-3-4-0-1-0-2-3-4-5-6-5-4-3-7-1-9-12-11-12-13-14
~~~

How to read the trace? It is very simple. The trace shows the memorized SDRs with the matching score 'similarity'.
In the current cycle following SDR was observed:
Cell SDR: 94, 11287, 12895, 13312, 13370, 24302, 24402, 24479, 24542, 24609, 24666, 24925, 25132, 25342, 25354, 25375, 25477, 25513, 25526, 25560,

The classifier is traversing through all memorized SDRs and tries to match the best one. In this case, there are two SDRs with the 14 matching cells at index 21 and 24.
The first one represents the sequence 
~~~
11-12-14-5-7-6-9-3-4-3-4-3-4-0-1-0-2-3-4-5-6-5-4-3-7-1-9-12-11-12-13-14
~~~ 
and the second one 
~~~
5-7-6-9-3-4-3-4-3-4-0-1-0-2-3-4-5-6-5-4-3-7-1-9-12-11-12-13-14-11-12-14
~~~

The current implementation of the classifier peeks the first best matching one, which is in more complex sequences not a sufficient solution. As you see, the '14' was correcttly predicted. But '14' after '13' is a different context than '14' after '12'.

### Next version of the classifier
We are considering to improve the classifier to be able to detect more complex sequence.
The classifier tracks the list of inputs during the learning process.

Consider the following situation noted in the sample above. The classifier enters with the following cell SDR:

“94, 11287, 12895, 13312, 13370, 24302, 24402, 24479, 24542, 24609, 24666, 24925, 25132, 25342, 25354, 25375, 25477, 25513, 25526, 25560“ and set of predictive cells:
“530, 855, 1213, 1228, 1339, 1988, 2318, 2925, 13843, 14641, 14961, 15043, 15322, 24538, 24932, 25268”

This corresponds to the input with index 23.

indx 20 14-11-12-14-5-7-6-9-3-4-3-4-3-4-0-1-0-2-3-4-5-6-5-4-3-7-1-9-12-11-12-13/20 = similarity 0	 
indx 21 11-12-14-5-7-6-9-3-4-3-4-3-4-0-1-0-2-3-4-5-6-5-4-3-7-1-9-12-11-12-13-14/20 = similarity 14	 
indx:22	12-14-5-7-6-9-3-4-3-4-3-4-0-1-0-2-3-4-5-6-5-4-3-7-1-9-12-11-12-13-14-11/20 = similarity 0	 
indx:*23*	14-5-7-6-9-3-4-3-4-3-4-0-1-0-2-3-4-5-6-5-4-3-7-1-9-12-11-12-13-14-11-12/20 = similarity 0	
indx:24	5-7-6-9-3-4-3-4-3-4-0-1-0-2-3-4-5-6-5-4-3-7-1-9-12-11-12-13-14-11-12-14/20 = similarity 14


The current implementation of the classifier traverses all SDRs and looks up for the most similar one. In this case, these are inputs with indexes 21 and 24 with the similarity of 14. That means the classifier is predicting two inputs at index 21 and 24. 

Following changes are required:

1.	The new version of the classifier should return the array of possible inputs sorted by similarity.
2.	The classifier should also look for the input and looks up the position of the classifier in the entire learning process.
In this case, the position of the classifier is at index 23. With this information, the classifier knows that the next predicted input one must be at position 24.

Note that the implementation of the classifier should not consider dealing with input values. We track internally input keys, but in real-world scenarios, we might not be able to track so many input values with any possible length of the key. We are considering removing keys in the given form in the future version of the classifier.

#### Method signature

~~~csharp
        /// <summary>
        /// Gets the list predicted inputs sorted by similarity.
        /// </summary>
        /// <param name="predictiveCells"></param>
        /// <param name="howMany">Specifies how many predicted SDRs should be reurned.</param>
        /// <returns></returns>
        public ICollection<ClassifierResult> GetPredictedInputValues(Cell[] predictiveCells, short howMany);
~~~
