import React, { useState } from "react";

export interface GeoLocationData {
    country_code?: string
    country_name?: string
    city?: string
    postal?: string
    latitude?: string
    longitude?: string
    IPv4?: string
    state?: string
}

export type ValueProps = {
    details?: GeoLocationData
}

export class GeoLocationDetails extends React.Component<ValueProps, any> {
    
    constructor(props: any) {
        super(props);     
        this.getUserGeolocationDetails = this.getUserGeolocationDetails.bind(this);
        this.setDetails = this.setDetails.bind(this);
        this.setState({...this.state, details: undefined, });
    }

    setDetails(data: GeoLocationData) {
        console.log(data);
        this.setState({...this.state, details : data});
    }

    getUserGeolocationDetails(event: any) {
        fetch(
            "https://geolocation-db.com/json/09068b10-55fe-11eb-8939-299a0c3ab5e5"
        )
            .then(response => response.json())
            .then(data => this.setDetails(data));
    };

    render() {
        const details = this.state ?  this.state.details : undefined;
        return (
            <div className="row">
                <div className="col text-center">
                    <h2>Find my IP and Location</h2>
                    <p className="mt-3">
                        <button
                            className="btn btn-primary"
                            onClick={this.getUserGeolocationDetails}
                        >
                            Find my details
                        </button>

                        <div className="row justify-content-center mt-3">
                            <div className="col-lg-6 text-center text-dark">
                                {
                                details && (
                                    <ul className="list-group">
                                        <li className="list-group-item">
                                            Geographical coordinates : {`${details.latitude} / ${details.longitude}`}
                                        </li>
                                        <li className="list-group-item">
                                            Location : {`${details.country_name}(${details.country_code})`}
                                        </li>
                                        <li className="list-group-item">
                                            IP V4: {details.IPv4}
                                        </li>
                                    </ul>
                                )}
                            </div>
                        </div>
                    </p>
                </div>
            </div>

    );
    }
}