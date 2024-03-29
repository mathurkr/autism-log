import React from 'react';
import { Camera } from 'expo-camera';
import { Ionicons } from '@expo/vector-icons';
import { Col, Row, Grid } from "react-native-easy-grid";
import { View, StyleSheet, Dimensions, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';


const { FlashMode: CameraFlashModes, Type: CameraTypes } = Camera.Constants;

export default ({
    capturing = false,
    cameraType = CameraTypes.back,
    flashMode = CameraFlashModes.off,
    setFlashMode, setCameraType,
    onCaptureIn, onCaptureOut, onLongCapture, onShortCapture,
}) => (
        <Grid style={styles.bottomToolbar}>
            <Row>
                <Col style={styles.alignCenter}>
                    <TouchableOpacity onPress={() => setFlashMode(
                        flashMode === CameraFlashModes.on ? CameraFlashModes.off : CameraFlashModes.on
                    )}>
                        <Ionicons
                            name={flashMode == CameraFlashModes.on ? "md-flash" : 'md-flash-off'}
                            color="white"
                            size={30}
                        />
                    </TouchableOpacity>
                </Col>
                <Col size={2} style={styles.alignCenter}>
                    <TouchableWithoutFeedback
                        onPressIn={onCaptureIn}
                        onPressOut={onCaptureOut}
                        onLongPress={onLongCapture}
                        onPress={onShortCapture}>
                        <View style={[styles.captureBtn, capturing && styles.captureBtnActive]}>
                            {capturing && <View style={styles.captureBtnInternal} />}
                        </View>
                    </TouchableWithoutFeedback>
                </Col>
                <Col style={styles.alignCenter}>
                    <TouchableOpacity onPress={() => setCameraType(
                        cameraType === CameraTypes.back ? CameraTypes.front : CameraTypes.back
                    )}>
                        <Ionicons
                            name="md-reverse-camera"
                            color="white"
                            size={30}
                        />
                    </TouchableOpacity>
                </Col>
            </Row>
        </Grid>
    );

const { width: winWidth, height: winHeight } = Dimensions.get('window');

const styles = StyleSheet.create({
    alignCenter: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    bottomToolbar: {
        width: winWidth,
        position: 'absolute',
        height: 100,
        bottom: 0,
    },
    captureBtn: {
        width: 60,
        height: 60,
        borderWidth: 2,
        borderRadius: 60,
        borderColor: "#FFFFFF",
    },
    captureBtnActive: {
        width: 80,
        height: 80,
    },
    captureBtnInternal: {
        width: 76,
        height: 76,
        borderWidth: 2,
        borderRadius: 76,
        backgroundColor: "red",
        borderColor: "transparent",
    },
});