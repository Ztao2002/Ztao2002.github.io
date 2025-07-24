### **Range-SLAM: Ultra-Wideband-Based Smoke-Resistant Real-Time Localization and Mapping**  
> *Yi Liu, Zhuozhu Jian, **Shengtao Zheng**, Houde Liu, Xueqian Wang, Xinlei Chen, Bin Liang*    
[![arXiv](https://img.shields.io/badge/arXiv-2409.09763-df2a2a.svg?style=for-the-badge)](https://arxiv.org/abs/2409.09763)


- First proposed a real-time localization and mapping based on Ultra-Wideband (UWB), combined with UWB tag motion and ray casting algorithms for map construction and updates, achieving precise map building and positioning without expensive LiDAR or other dedicated hardware.

- **Technical Details**: Proposed an SLAM system that relies entirely on UWB devices for real-time localization and mapping; designed a low-complexity real-time NLOS recognition module based on Support Vector Machine (SVM) to quickly detect obstacles between anchors and tags; integrated robot motion data with ray casting algorithms to construct a 2D occupancy grid map in real-time environments solely using UWB ranging information and RSSI; improved positioning accuracy in NLOS areas by adopting Weighted Least Squares (WLS) based on the constructed grid map.  

---

### **LVCP: LiDAR-Vision Tightly Coupled Collaborative Real-time Relative Positioning**  
> *Zhuozhu Jian, Qixuan Li, **Shengtao Zheng**, Xueqian Wang, Xinlei Chen*  
[![arXiv](https://img.shields.io/badge/arXiv-2407.10782-df2a2a.svg?style=for-the-badge)](https://arxiv.org/abs/2407.10782)

- Proposed a robust real-time relative pose estimation method tightly coupled with monocular vision cameras and LiDAR point clouds (LVCP), enabling drones to achieve accurate relative positioning without prior maps and initial pose disturbances.

- **Technical Details**: Introduced a novel coarse-to-fine framework for real-time collaborative localization using LiDAR and vision; utilized Visual-Inertial Odometry (VIO) to propagate initial camera poses and build feature point clouds, followed by backend optimization based on pose sampling and spatial association of feature point clouds for precise localization; proposed an adaptive event-triggered PSO sampling algorithm to achieve relatively accurate point cloud matching within limited time intervals; associated feature point clouds with LiDAR point clouds based on three-dimensional geometric space information and built point-auxiliary Bundle Adjustment (BA) problems based on point-plane residuals.
